(() => {
  "use strict";
  function e() {
    if (location.hash) return location.hash.replace("#", "");
  }
  let t = !0,
    o = (e = 500) => {
      let o = document.querySelector("body");
      if (t) {
        let a = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < a.length; e++) {
            a[e].style.paddingRight = "0px";
          }
          (o.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    },
    a = (e = 500) => {
      let o = document.querySelector("body");
      if (t) {
        let a = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < a.length; e++) {
          a[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (o.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    };
  function n(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  let r = (e, t = !1, a = 500, r = 0) => {
    const i = document.querySelector(e);
    if (i) {
      let s = "",
        l = 0;
      t &&
        ((s = "header.header"), (l = document.querySelector(s).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: a,
        header: s,
        offset: r,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(i, "", c);
      else {
        let e = i.getBoundingClientRect().top + scrollY;
        (e = l ? e - l : e),
          (e = r ? e - r : e),
          window.scrollTo({ top: e, behavior: "smooth" });
      }
      n(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else n(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  let i = !1;
  function s(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (i) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (s.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          o = t.dataset.da.trim().split(","),
          a = {};
        (a.element = t),
          (a.parent = t.parentNode),
          (a.destination = document.querySelector(o[0].trim())),
          (a.breakpoint = o[1] ? o[1].trim() : "767"),
          (a.place = o[2] ? o[2].trim() : "last"),
          (a.index = this.indexInParent(a.parent, a.element)),
          this.оbjects.push(a);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, o) {
            return Array.prototype.indexOf.call(o, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const o = this.mediaQueries[t],
          a = String.prototype.split.call(o, ","),
          n = window.matchMedia(a[0]),
          r = a[1],
          i = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r;
          });
        n.addListener(function () {
          e.mediaHandler(n, i);
        }),
          this.mediaHandler(n, i);
      }
    }),
    (s.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const o = t[e];
          (o.index = this.indexInParent(o.parent, o.element)),
            this.moveTo(o.place, o.element, o.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const o = t[e];
          o.element.classList.contains(this.daClassname) &&
            this.moveBack(o.parent, o.element, o.index);
        }
    }),
    (s.prototype.moveTo = function (e, t, o) {
      t.classList.add(this.daClassname),
        "last" === e || e >= o.children.length
          ? o.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? o.children[e].insertAdjacentElement("beforebegin", t)
          : o.insertAdjacentElement("afterbegin", t);
    }),
    (s.prototype.moveBack = function (e, t, o) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[o]
          ? e.children[o].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (s.prototype.indexInParent = function (e, t) {
      const o = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(o, t);
    }),
    (s.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new s("max").init(),
    gsap.registerPlugin(ScrollTrigger),
    window.innerWidth > 767.8 &&
      (gsap.from(".fs", 0.5, { opacity: 0 }),
      gsap.from(".fs__container", 0.5, { opacity: 0, delay: 0.5 }),
      gsap.from(".job__item", 0.2, {
        scrollTrigger: { trigger: ".fs", start: "20% top" },
        y: 20,
        opacity: 0,
        stagger: 0.2,
      }),
      gsap.from(".item-team", 0.2, {
        scrollTrigger: { trigger: ".lid_fs", start: "20% top" },
        y: 20,
        opacity: 0,
        stagger: 0.2,
      }),
      gsap.from(".num__item", 0.2, {
        scrollTrigger: { trigger: ".team", start: "20% top" },
        y: 20,
        opacity: 0,
        stagger: 0.2,
      }),
      gsap.from(".project__item", 0.2, {
        scrollTrigger: { trigger: ".spealisation", start: "90% top" },
        y: 20,
        opacity: 0,
        stagger: 0.2,
      }),
      gsap.from(".format__item", 0.2, {
        scrollTrigger: { trigger: ".bg", start: "50% top" },
        y: 20,
        opacity: 0,
        stagger: 0.2,
      }),
      gsap.from(".partners__item", 0.2, {
        scrollTrigger: {
          trigger: ".format",
          start: "80% top",
          end: "2000 bottom",
        },
        y: 20,
        opacity: 0,
        stagger: 0.2,
      }),
      ScrollTrigger.create({
        trigger: ".spealisation__img",
        start: "top top",
        end: "140% bottom",
        pin: ".img-spec",
        pinnedContainer: ".wrapper",
        pinReparent: !0,
      })),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    document.querySelector(".icon-menu") &&
      document.addEventListener("click", function (e) {
        t &&
          e.target.closest(".icon-menu") &&
          (((e = 500) => {
            document.documentElement.classList.contains("lock") ? o(e) : a(e);
          })(),
          document.documentElement.classList.toggle("menu-open"));
      }),
    (function () {
      function t(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const o = t.closest("[data-goto]"),
              a = o.dataset.goto ? o.dataset.goto : "",
              n = !!o.hasAttribute("data-goto-header"),
              i = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : 500,
              s = o.dataset.gotoTop ? parseInt(o.dataset.gotoTop) : 0;
            r(a, n, i, s), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            o = t.target;
          if ("navigator" === o.dataset.watch) {
            document.querySelector("[data-goto]._navigator-active");
            let e;
            if (o.id && document.querySelector(`[data-goto="#${o.id}"]`))
              e = document.querySelector(`[data-goto="#${o.id}"]`);
            else if (o.classList.length)
              for (let t = 0; t < o.classList.length; t++) {
                const a = o.classList[t];
                if (document.querySelector(`[data-goto=".${a}"]`)) {
                  e = document.querySelector(`[data-goto=".${a}"]`);
                  break;
                }
              }
            t.isIntersecting
              ? e && e.classList.add("_navigator-active")
              : e && e.classList.remove("_navigator-active");
          }
        }
      }
      if (
        (document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t),
        e())
      ) {
        let t;
        document.querySelector(`#${e()}`)
          ? (t = `#${e()}`)
          : document.querySelector(`.${e()}`) && (t = `.${e()}`),
          t && r(t, !0, 500, 20);
      }
    })(),
    (function () {
      i = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        o = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        a = e.dataset.scroll ? e.dataset.scroll : 1;
      let n,
        r = 0;
      document.addEventListener("windowScroll", function (i) {
        const s = window.scrollY;
        clearTimeout(n),
          s >= a
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              t &&
                (s > r
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (n = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, o))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (r = s <= 0 ? 0 : s);
      });
    })();
})();
