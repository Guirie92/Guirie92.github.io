﻿!function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        var e = "line-numbers"
            , n = /\n(?!$)/g
            , t = Prism.plugins.lineNumbers = {
                getLine: function (n, t) {
                    if ("PRE" === n.tagName && n.classList.contains(e)) {
                        var i = n.querySelector(".line-numbers-rows");
                        if (i) {
                            var r = parseInt(n.getAttribute("data-start"), 10) || 1
                                , s = r + (i.children.length - 1);
                            t < r && (t = r),
                                t > s && (t = s);
                            var l = t - r;
                            return i.children[l]
                        }
                    }
                },
                resize: function (e) {
                    r([e])
                },
                assumeViewportIndependence: !0
            }
            , i = void 0;
        window.addEventListener("resize", (function () {
            t.assumeViewportIndependence && i === window.innerWidth || (i = window.innerWidth,
                r(Array.prototype.slice.call(document.querySelectorAll("pre.line-numbers"))))
        }
        )),
            Prism.hooks.add("complete", (function (t) {
                if (t.code) {
                    var i = t.element
                        , s = i.parentNode;
                    if (s && /pre/i.test(s.nodeName) && !i.querySelector(".line-numbers-rows") && Prism.util.isActive(i, e)) {
                        i.classList.remove(e),
                            s.classList.add(e);
                        var l, o = t.code.match(n), a = o ? o.length + 1 : 1, u = new Array(a + 1).join("<span></span>");



                        // Calculating the number of rows
                        var count = 1;
                        while (a >= 10) {
                            a /= 10;
                            count++;
                        }
                        /**
                         * With no padding in the ".line-numbers-rows > span", the base padding-left
                         * is 2.2em (basePadding).
                         * However, if we add padding (in this case, 10px), then the base padding
                         * is "2.9em".
                        */
                        const basePadding = 3.5;
                        const calculatedPadding = basePadding + (count - 1) * 0.5;
                        s.style.setProperty("--line-number-padding-left", `${calculatedPadding}em`);



                        (l = document.createElement("span")).setAttribute("aria-hidden", "true"),
                            l.className = "line-numbers-rows",
                            l.innerHTML = u,
                            s.hasAttribute("data-start") && (s.style.counterReset = "linenumber " + (parseInt(s.getAttribute("data-start"), 10) - 1)),
                            t.element.appendChild(l),
                            r([s]),
                            Prism.hooks.run("line-numbers", t)
                    }
                }
            }
            )),
            Prism.hooks.add("line-numbers", (function (e) {
                e.plugins = e.plugins || {},
                    e.plugins.lineNumbers = !0
            }
            ))
    }
    function r(e) {
        if (0 != (e = e.filter((function (e) {
            var n, t = (n = e,
                n ? window.getComputedStyle ? getComputedStyle(n) : n.currentStyle || null : null)["white-space"];
            return "pre-wrap" === t || "pre-line" === t
        }
        ))).length) {
            var t = e.map((function (e) {
                var t = e.querySelector("code")
                    , i = e.querySelector(".line-numbers-rows");
                if (t && i) {
                    var r = e.querySelector(".line-numbers-sizer")
                        , s = t.textContent.split(n);
                    r || ((r = document.createElement("span")).className = "line-numbers-sizer",
                        t.appendChild(r)),
                        r.innerHTML = "0",
                        r.style.display = "block";
                    var l = r.getBoundingClientRect().height;
                    return r.innerHTML = "",
                    {
                        element: e,
                        lines: s,
                        lineHeights: [],
                        oneLinerHeight: l,
                        sizer: r
                    }
                }
            }
            )).filter(Boolean);
            t.forEach((function (e) {
                var n = e.sizer
                    , t = e.lines
                    , i = e.lineHeights
                    , r = e.oneLinerHeight;
                i[t.length - 1] = void 0,
                    t.forEach((function (e, t) {
                        if (e && e.length > 1) {
                            var s = n.appendChild(document.createElement("span"));
                            s.style.display = "block",
                                s.textContent = e
                        } else
                            i[t] = r
                    }
                    ))
            }
            )),
                t.forEach((function (e) {
                    for (var n = e.sizer, t = e.lineHeights, i = 0, r = 0; r < t.length; r++)
                        void 0 === t[r] && (t[r] = n.children[i++].getBoundingClientRect().height)
                }
                )),
                t.forEach((function (e) {
                    var n = e.sizer
                        , t = e.element.querySelector(".line-numbers-rows");
                    n.style.display = "none",
                        n.innerHTML = "",
                        e.lineHeights.forEach((function (e, n) {
                            t.children[n].style.height = e + "px"
                        }
                        ))
                }
                ))
        }
    }
}();


/*********************************************************************************
 ************************** ORIGINAL IMPLEMENTATION ******************************
 * 
 * The line numbers are positioned on the left of the code block with a fixed
 *  padding (padding-left).
 * 
 * If the number of digits increases (e.g., from 9 to 10 or 99 to 100), the padding
 *  remains unchanged, and the line numbers extend to the left away from the code
 *  block. This behavior ensures the code block itself is unaffected by the line
 *  numbers, but it does not "push" the code block to accommodate wider numbers.
 * 
 ***************************************************************************/

//!function () {
//    if ("undefined" != typeof Prism && "undefined" != typeof document) {
//        var e = "line-numbers"
//            , n = /\n(?!$)/g
//            , t = Prism.plugins.lineNumbers = {
//                getLine: function (n, t) {
//                    if ("PRE" === n.tagName && n.classList.contains(e)) {
//                        var i = n.querySelector(".line-numbers-rows");
//                        if (i) {
//                            var r = parseInt(n.getAttribute("data-start"), 10) || 1
//                                , s = r + (i.children.length - 1);
//                            t < r && (t = r),
//                                t > s && (t = s);
//                            var l = t - r;
//                            return i.children[l]
//                        }
//                    }
//                },
//                resize: function (e) {
//                    r([e])
//                },
//                assumeViewportIndependence: !0
//            }
//            , i = void 0;
//        window.addEventListener("resize", (function () {
//            t.assumeViewportIndependence && i === window.innerWidth || (i = window.innerWidth,
//                r(Array.prototype.slice.call(document.querySelectorAll("pre.line-numbers"))))
//        }
//        )),
//            Prism.hooks.add("complete", (function (t) {
//                if (t.code) {
//                    var i = t.element
//                        , s = i.parentNode;
//                    if (s && /pre/i.test(s.nodeName) && !i.querySelector(".line-numbers-rows") && Prism.util.isActive(i, e)) {
//                        i.classList.remove(e),
//                            s.classList.add(e);
//                        var l, o = t.code.match(n), a = o ? o.length + 1 : 1, u = new Array(a + 1).join("<span></span>");
//                        (l = document.createElement("span")).setAttribute("aria-hidden", "true"),
//                            l.className = "line-numbers-rows",
//                            l.innerHTML = u,
//                            s.hasAttribute("data-start") && (s.style.counterReset = "linenumber " + (parseInt(s.getAttribute("data-start"), 10) - 1)),
//                            t.element.appendChild(l),
//                            r([s]),
//                            Prism.hooks.run("line-numbers", t)
//                    }
//                }
//            }
//            )),
//            Prism.hooks.add("line-numbers", (function (e) {
//                e.plugins = e.plugins || {},
//                    e.plugins.lineNumbers = !0
//            }
//            ))
//    }
//    function r(e) {
//        if (0 != (e = e.filter((function (e) {
//            var n, t = (n = e,
//                n ? window.getComputedStyle ? getComputedStyle(n) : n.currentStyle || null : null)["white-space"];
//            return "pre-wrap" === t || "pre-line" === t
//        }
//        ))).length) {
//            var t = e.map((function (e) {
//                var t = e.querySelector("code")
//                    , i = e.querySelector(".line-numbers-rows");
//                if (t && i) {
//                    var r = e.querySelector(".line-numbers-sizer")
//                        , s = t.textContent.split(n);
//                    r || ((r = document.createElement("span")).className = "line-numbers-sizer",
//                        t.appendChild(r)),
//                        r.innerHTML = "0",
//                        r.style.display = "block";
//                    var l = r.getBoundingClientRect().height;
//                    return r.innerHTML = "",
//                    {
//                        element: e,
//                        lines: s,
//                        lineHeights: [],
//                        oneLinerHeight: l,
//                        sizer: r
//                    }
//                }
//            }
//            )).filter(Boolean);
//            t.forEach((function (e) {
//                var n = e.sizer
//                    , t = e.lines
//                    , i = e.lineHeights
//                    , r = e.oneLinerHeight;
//                i[t.length - 1] = void 0,
//                    t.forEach((function (e, t) {
//                        if (e && e.length > 1) {
//                            var s = n.appendChild(document.createElement("span"));
//                            s.style.display = "block",
//                                s.textContent = e
//                        } else
//                            i[t] = r
//                    }
//                    ))
//            }
//            )),
//                t.forEach((function (e) {
//                    for (var n = e.sizer, t = e.lineHeights, i = 0, r = 0; r < t.length; r++)
//                        void 0 === t[r] && (t[r] = n.children[i++].getBoundingClientRect().height)
//                }
//                )),
//                t.forEach((function (e) {
//                    var n = e.sizer
//                        , t = e.element.querySelector(".line-numbers-rows");
//                    n.style.display = "none",
//                        n.innerHTML = "",
//                        e.lineHeights.forEach((function (e, n) {
//                            t.children[n].style.height = e + "px"
//                        }
//                        ))
//                }
//                ))
//        }
//    }
//}();
