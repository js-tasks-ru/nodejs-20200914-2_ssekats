const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

let _subscriber = 1;

router.get('/subscribe', async (ctx, next) => {
  const _lastMessage = new Promise((resolve) => {
    this['_resolveSubscriber' + _subscriber] = resolve;
  });
  _subscriber++;
  ctx.body = await _lastMessage;
});

router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;
  if (message) {
    for (let i = 1; i < _subscriber; i++) {
      this['_resolveSubscriber' + i](message);
    }
    _subscriber = 1;
    ctx.status = 201;
  }
});

app.use(router.routes());

module.exports = app;
