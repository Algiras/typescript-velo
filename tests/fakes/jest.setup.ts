const validHandlers = [
  "viewportEnter",
  "click",
  "change",
  "mouseIn",
  "mouseOut",
  "keyPress",
  "input",
];

export function buildEnv(contexts, store, styles) {
  const fn = (withName) => {
    const name = [...contexts, ...withName.split(" ")].join(" ");

    if (!store.hasOwnProperty(`${name}[enabled]`)) {
      store[`${name}[enabled]`] = true;
    }

    const handlers = validHandlers.reduce((agg, handler) => {
      if (!store.hasOwnProperty(`${name}[${handler}]`)) {
        store[`${name}[${handler}]`] = () => ({});
      }
      agg[`on${handler.substring(0, 1).toUpperCase()}${handler.substring(1)}`] =
        (cb) => {
          store[`${name}[${handler}]`] = cb;
        };
      agg[handler] = (event = {}) => {
        const selectors = [name, ...name.split(" ")];
        const context = name.split(" ")[0];

        selectors.map((selector) => {
          if (store[`${selector}[enabled]`]) {
            store[`${selector}[${handler}]`]({
              context: context ? [context] : [],
              ...event,
            });
          }
        });
      };
      return agg;
    }, {});

    const processItem = (fn) => {
      const localData = store[`${name}[data]`] || [];
      localData.forEach((value, index) =>
        fn(
          buildEnv([...contexts, `${name}[${index}]`], store, styles),
          value,
          index
        )
      );
    };

    return new Proxy(
      {
        ...handlers,
        forEachItem: processItem,
        onItemReady: (fn) =>
          (store[`${name}[itemReady]`] = () => processItem(fn)),
        expandIcon: () => (store[`${name}[isExpanded]`] = true),
        collapseIcon: () => (store[`${name}[isExpanded]`] = false),
        check: () => (store[`${name}[checked]`] = !store[`${name}[checked]`]),
        collapse: () => (store[`${name}[isCollapsed]`] = true),
        expand: () => (store[`${name}[isCollapsed]`] = false),
        disable: () => (store[`${name}[enabled]`] = false),
        enable: () => (store[`${name}[enabled]`] = true),
        isEnabled: () => store[`${name}[enabled]`],
        hide: () => (store[`${name}[isHidden]`] = true),
        show: () => (store[`${name}[isHidden]`] = false),
        switch: () => {
          store[`${name}[value]`] = !store[`${name}[value]`];
          store[`${name}[checked]`] = !store[`${name}[checked]`];
          store[`${name}[change]`]({
            target: {
              value: store[`${name}[value]`],
              checked: store[`${name}[checked]`],
            },
          });
        },
        select: (value) => {
          store[`${name}[value]`] = value;
          store[`${name}[change]`]({ target: { value } });
        },
        changeState: (stateName) => (store[`${name}[state]`] = stateName),
        postMessage: (msg) => (store[`${name}[event]`] = { data: msg }),
        focus: () => (store["focused"] = name),
        isCollapsed: true,
        enabled: true,
        value: "",
        label: "",
        link: "",
        style: new Proxy(styles[name] || {}, {
          get(target, prop: string) {
            return (styles[name] || {})[prop];
          },
          set(obj, prop: string, value) {
            styles[name] = {
              ...(styles[name] || {}),
              [prop]: value,
            };
            return true;
          },
        }),
        text: "",
        event: {},
      },
      {
        get(target, prop: string) {
          const validParameters = new Set([
            "value",
            "valid",
            "checked",
            "event",
            "data",
            "label",
            "link",
            "text",
            "enabled",
            "isExpanded",
            "isCollapsed",
          ]);
          if (prop === "isHidden") {
            return store[`${name}[${prop}]`] == undefined
              ? false
              : store[`${name}[${prop}]`];
          } else if (validParameters.has(prop)) {
            return store[`${name}[${prop}]`];
          } else if (prop === "focused") {
            return store["focused"];
          } else if (prop === "currentState") {
            return store[`${name}[state]`] || null;
          } else {
            return target[prop];
          }
        },
        set(obj, prop: string, value) {
          const settableValues = new Set([
            "value",
            "valid",
            "label",
            "link",
            "event",
            "text",
          ]);
          if (settableValues.has(prop)) {
            store[`${name}[${prop}]`] = value;
            store[`${name}[change]`]({ target: { value } });
          } else if (prop === "checked") {
            store[`${name}[checked]`] = !store[`${name}[checked]`];
          } else if (prop === "input") {
            if (store[`${name}[input]`]) {
              store[`${name}[change]`]({ target: { value } });
              store[`${name}[input]`]({ target: { value } });
            }
          } else if (prop === "keyPressed") {
            if (store[`${name}[keyPress]`]) {
              store[`${name}[keyPress]`]({ target: { value } });
            }
          } else if (prop === "data") {
            store[`${name}[data]`] = value;
            store[`${name}[itemReady]`] && store[`${name}[itemReady]`]();
          } else {
            obj[prop] = value;
          }
          return true;
        },
      }
    );
  };

  fn.onReady = () => {
    if (contexts.length === 0) {
      store = {};
    }
  };

  fn.at = (context) => {
    return buildEnv([...contexts, ...context], store, styles);
  };

  return fn as typeof $w;
}

export const testEnv = () => buildEnv([], {}, {});

global.$w = testEnv();
