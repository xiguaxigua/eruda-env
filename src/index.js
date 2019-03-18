module.exports = function(eruda) {
  let { evalCss } = eruda.util;

  class EnvSwitch extends eruda.Tool {
    constructor(props) {
      super();
      this.name = 'env';
      this._style = evalCss(require('./style.scss'));
    }
    init($el, container) {
      super.init($el, container);
      $el.html(require('./template.hbs')());
      eruda.setEnv = envs => {
        const box = $el.find('.eruda-box');
        envs.forEach(({ name, url }) => {
          const btn = document.createElement('div');
          btn.addEventListener('click', event => {
            const { url } = event.target.dataset;
            if (url) {
              window.location.href = window.location.href.replace(
                window.location.origin,
                url,
              );
            }
          });
          const isCurrent = url === window.location.origin ? '⭐️': '';
          btn.className = 'eruda-btn';
          btn.dataset.url = url;
          btn.innerHTML = name + isCurrent;
          box.get(0).appendChild(btn);
        });
      };
    }
    show() {
      super.show();
    }
    hide() {
      super.hide();
    }
    destroy() {
      super.destroy();
      evalCss.remove(this._style);
    }
  }

  return new EnvSwitch();
};
