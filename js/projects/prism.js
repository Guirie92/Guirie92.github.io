﻿var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}
    , Prism = function (l) {
    var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i
        , t = 0
        , e = {}
        , j = {
        manual: l.Prism && l.Prism.manual,
        disableWorkerMessageHandler: l.Prism && l.Prism.disableWorkerMessageHandler,
        util: {
            encode: function e(t) {
                return t instanceof C ? new C(t.type, e(t.content), t.alias) : Array.isArray(t) ? t.map(e) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
            },
            type: function (e) {
                return Object.prototype.toString.call(e).slice(8, -1)
            },
            objId: function (e) {
                return e.__id || Object.defineProperty(e, "__id", {
                    value: ++t
                }),
                    e.__id
            },
            clone: function n(e, a) {
                var r, t;
                switch (a = a || {},
                    j.util.type(e)) {
                    case "Object":
                        if (t = j.util.objId(e),
                            a[t])
                            return a[t];
                        for (var s in r = {},
                            a[t] = r,
                            e)
                            e.hasOwnProperty(s) && (r[s] = n(e[s], a));
                        return r;
                    case "Array":
                        return (t = j.util.objId(e),
                            a[t]) ? a[t] : (r = [],
                            a[t] = r,
                            e.forEach(function (e, t) {
                                r[t] = n(e, a)
                            }),
                            r);
                    default:
                        return e
                }
            },
            getLanguage: function (e) {
                for (; e;) {
                    var t = n.exec(e.className);
                    if (t)
                        return t[1].toLowerCase();
                    e = e.parentElement
                }
                return "none"
            },
            setLanguage: function (e, t) {
                e.className = e.className.replace(RegExp(n, "gi"), ""),
                    e.classList.add("language-" + t)
            },
            currentScript: function () {
                if ("undefined" == typeof document)
                    return null;
                if ("currentScript" in document)
                    return document.currentScript;
                try {
                    throw new Error
                } catch (e) {
                    var t = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) || [])[1];
                    if (t) {
                        var n, a = document.getElementsByTagName("script");
                        for (n in a)
                            if (a[n].src == t)
                                return a[n]
                    }
                    return null
                }
            },
            isActive: function (e, t, n) {
                for (var a = "no-" + t; e;) {
                    var r = e.classList;
                    if (r.contains(t))
                        return !0;
                    if (r.contains(a))
                        return !1;
                    e = e.parentElement
                }
                return !!n
            }
        },
        languages: {
            plain: e,
            plaintext: e,
            text: e,
            txt: e,
            extend: function (e, t) {
                var n, a = j.util.clone(j.languages[e]);
                for (n in t)
                    a[n] = t[n];
                return a
            },
            insertBefore: function (n, e, t, a) {
                var r, s = (a = a || j.languages)[n], i = {};
                for (r in s)
                    if (s.hasOwnProperty(r)) {
                        if (r == e)
                            for (var o in t)
                                t.hasOwnProperty(o) && (i[o] = t[o]);
                        t.hasOwnProperty(r) || (i[r] = s[r])
                    }
                var l = a[n];
                return a[n] = i,
                    j.languages.DFS(j.languages, function (e, t) {
                        t === l && e != n && (this[e] = i)
                    }),
                    i
            },
            DFS: function e(t, n, a, r) {
                r = r || {};
                var s, i, o, l = j.util.objId;
                for (s in t)
                    t.hasOwnProperty(s) && (n.call(t, s, t[s], a || s),
                        i = t[s],
                        "Object" !== (o = j.util.type(i)) || r[l(i)] ? "Array" !== o || r[l(i)] || (r[l(i)] = !0,
                            e(i, n, s, r)) : (r[l(i)] = !0,
                            e(i, n, null, r)))
            }
        },
        plugins: {},
        highlightAll: function (e, t) {
            j.highlightAllUnder(document, e, t)
        },
        highlightAllUnder: function (e, t, n) {
            var a = {
                callback: n,
                container: e,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            j.hooks.run("before-highlightall", a),
                a.elements = Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)),
                j.hooks.run("before-all-elements-highlight", a);
            for (var r, s = 0; r = a.elements[s++];)
                j.highlightElement(r, !0 === t, a.callback)
        },
                                                                                                                                highlightElement: function (e, t, n) {
            var a = j.util.getLanguage(e)
                , r = j.languages[a]
                , s = (j.util.setLanguage(e, a),
                e.parentElement);
            s && "pre" === s.nodeName.toLowerCase() && j.util.setLanguage(s, a);
            var i = {
                element: e,
                language: a,
                grammar: r,
                code: e.textContent
            };

            function o(e) {
                i.highlightedCode = e,
                    j.hooks.run("before-insert", i),
                    i.element.innerHTML = i.highlightedCode,
                    j.hooks.run("after-highlight", i),
                    j.hooks.run("complete", i),
                n && n.call(i.element)
            }

            if (j.hooks.run("before-sanity-check", i),
            (s = i.element.parentElement) && "pre" === s.nodeName.toLowerCase() && !s.hasAttribute("tabindex") && s.setAttribute("tabindex", "0"),
                !i.code)
                return j.hooks.run("complete", i),
                    void (n && n.call(i.element));
            j.hooks.run("before-highlight", i),
                i.grammar ? t && l.Worker ? ((a = new Worker(j.filename)).onmessage = function (e) {
                    o(e.data)
                }
                    ,
                    a.postMessage(JSON.stringify({
                        language: i.language,
                        code: i.code,
                        immediateClose: !0
                    }))) : o(j.highlight(i.code, i.grammar, i.language)) : o(j.util.encode(i.code))
        },
        highlight: function (e, t, n) {
            e = {
                code: e,
                grammar: t,
                language: n
            };
            if (j.hooks.run("before-tokenize", e),
                e.grammar)
                return e.tokens = j.tokenize(e.code, e.grammar),
                    j.hooks.run("after-tokenize", e),
                    C.stringify(j.util.encode(e.tokens), e.language);
            throw new Error('The language "' + e.language + '" has no grammar.')
        },
        tokenize: function (e, t) {
            var n = t.rest;
            if (n) {
                for (var a in n)
                    t[a] = n[a];
                delete t.rest
            }
            for (var r = new u, s = (z(r, r.head, e),
                !function e(t, n, a, r, s, i) {
                    for (var o in a)
                        if (a.hasOwnProperty(o) && a[o]) {
                            var l = a[o];
                            l = Array.isArray(l) ? l : [l];
                            for (var u = 0; u < l.length; ++u) {
                                if (i && i.cause == o + "," + u)
                                    return;
                                for (var g, c = l[u], d = c.inside, p = !!c.lookbehind, m = !!c.greedy, h = c.alias, f = (m && !c.pattern.global && (g = c.pattern.toString().match(/[imsuy]*$/)[0],
                                    c.pattern = RegExp(c.pattern.source, g + "g")),
                                c.pattern || c), b = r.next, y = s; b !== n.tail && !(i && y >= i.reach); y += b.value.length,
                                         b = b.next) {
                                    var v = b.value;
                                    if (n.length > t.length)
                                        return;
                                    if (!(v instanceof C)) {
                                        var F, x = 1;
                                        if (m) {
                                            if (!(F = L(f, y, t, p)) || F.index >= t.length)
                                                break;
                                            var k = F.index
                                                , w = F.index + F[0].length
                                                , A = y;
                                            for (A += b.value.length; A <= k;)
                                                b = b.next,
                                                    A += b.value.length;
                                            if (A -= b.value.length,
                                                y = A,
                                            b.value instanceof C)
                                                continue;
                                            for (var P = b; P !== n.tail && (A < w || "string" == typeof P.value); P = P.next)
                                                x++,
                                                    A += P.value.length;
                                            x--,
                                                v = t.slice(y, A),
                                                F.index -= y
                                        } else if (!(F = L(f, 0, v, p)))
                                            continue;
                                        var k = F.index
                                            , $ = F[0]
                                            , S = v.slice(0, k)
                                            , E = v.slice(k + $.length)
                                            , v = y + v.length
                                            , _ = (i && v > i.reach && (i.reach = v),
                                            b.prev)
                                            , S = (S && (_ = z(n, _, S),
                                            y += S.length),
                                            O(n, _, x),
                                            new C(o, d ? j.tokenize($, d) : $, h, $));
                                        b = z(n, _, S),
                                        E && z(n, b, E),
                                        1 < x && ($ = {
                                            cause: o + "," + u,
                                            reach: v
                                        },
                                            e(t, n, a, b.prev, y, $),
                                        i && $.reach > i.reach && (i.reach = $.reach))
                                    }
                                }
                            }
                        }
                }(e, r, t, r.head, 0),
                r), i = [], o = s.head.next; o !== s.tail;)
                i.push(o.value),
                    o = o.next;
            return i
        },
        hooks: {
            all: {},
            add: function (e, t) {
                var n = j.hooks.all;
                n[e] = n[e] || [],
                    n[e].push(t)
            },
            run: function (e, t) {
                var n = j.hooks.all[e];
                if (n && n.length)
                    for (var a, r = 0; a = n[r++];)
                        a(t)
            }
        },
        Token: C
    };

    function C(e, t, n, a) {
        this.type = e,
            this.content = t,
            this.alias = n,
            this.length = 0 | (a || "").length
    }

    function L(e, t, n, a) {
        e.lastIndex = t;
        t = e.exec(n);
        return t && a && t[1] && (e = t[1].length,
            t.index += e,
            t[0] = t[0].slice(e)),
            t
    }

    function u() {
        var e = {
            value: null,
            prev: null,
            next: null
        }
            , t = {
            value: null,
            prev: e,
            next: null
        };
        e.next = t,
            this.head = e,
            this.tail = t,
            this.length = 0
    }

    function z(e, t, n) {
        var a = t.next
            , n = {
            value: n,
            prev: t,
            next: a
        };
        return t.next = n,
            a.prev = n,
            e.length++,
            n
    }

    function O(e, t, n) {
        for (var a = t.next, r = 0; r < n && a !== e.tail; r++)
            a = a.next;
        (t.next = a).prev = t,
            e.length -= r
    }

    if (l.Prism = j,
        C.stringify = function t(e, n) {
            if ("string" == typeof e)
                return e;
            var a;
            if (Array.isArray(e))
                return a = "",
                    e.forEach(function (e) {
                        a += t(e, n)
                    }),
                    a;
            var r, s = {
                type: e.type,
                content: t(e.content, n),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: n
            }, e = e.alias, i = (e && (Array.isArray(e) ? Array.prototype.push.apply(s.classes, e) : s.classes.push(e)),
                j.hooks.run("wrap", s),
                "");
            for (r in s.attributes)
                i += " " + r + '="' + (s.attributes[r] || "").replace(/"/g, "&quot;") + '"';
            return "<" + s.tag + ' class="' + s.classes.join(" ") + '"' + i + ">" + s.content + "</" + s.tag + ">"
        }
        ,
        !l.document)
        return l.addEventListener && (j.disableWorkerMessageHandler || l.addEventListener("message", function (e) {
            var e = JSON.parse(e.data)
                , t = e.language
                , n = e.code
                , e = e.immediateClose;
            l.postMessage(j.highlight(n, j.languages[t], t)),
            e && l.close()
        }, !1)),
            j;
    var a, e = j.util.currentScript();

    function r() {
        j.manual || j.highlightAll()
    }

    return e && (j.filename = e.src,
    e.hasAttribute("data-manual") && (j.manual = !0)),
    j.manual || ("loading" === (a = document.readyState) || "interactive" === a && e && e.defer ? document.addEventListener("DOMContentLoaded", r) : window.requestAnimationFrame ? window.requestAnimationFrame(r) : window.setTimeout(r, 16)),
        j
}(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
"undefined" != typeof global && (global.Prism = Prism),
    Prism.languages.markup = {
        //"doc-comment": {
        //    pattern: /\/\*\*[\s\S]*?\*\//,
        //    greedy: !0
        //},
        comment: {
            pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
            greedy: !0
        },
        prolog: {
            pattern: /<\?[\s\S]+?\?>/,
            greedy: !0
        },
        doctype: {
            pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
                "internal-subset": {
                    pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: null
                },
                string: {
                    pattern: /"[^"]*"|'[^']*'/,
                    greedy: !0
                },
                punctuation: /^<!|>$|[[\]]/,
                "doctype-tag": /^DOCTYPE/i,
                name: /[^\s<>'"]+/
            }
        },
        cdata: {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            greedy: !0
        },
        tag: {
            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
                tag: {
                    pattern: /^<\/?[^\s>\/]+/,
                    inside: {
                        punctuation: /^<\/?/,
                        namespace: /^[^\s>\/:]+:/
                    }
                },
                "special-attr": [],
                "attr-value": {
                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                    inside: {
                        punctuation: [{
                            pattern: /^=/,
                            alias: "attr-equals"
                        }, {
                            pattern: /^(\s*)["']|["']$/,
                            lookbehind: !0
                        }]
                    }
                },
                punctuation: /\/?>/,
                "attr-name": {
                    pattern: /[^\s>\/]+/,
                    inside: {
                        namespace: /^[^\s>\/:]+:/
                    }
                }
            }
        },
        entity: [{
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
        }, /&#x?[\da-f]{1,8};/i]
    },
    Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity,
    Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup,
    Prism.hooks.add("wrap", function (e) {
        "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function (e, t) {
            var n = {}
                , n = (n["language-" + t] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[t]
            },
                n.cdata = /^<!\[CDATA\[|\]\]>$/i,
                {
                    "included-cdata": {
                        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                        inside: n
                    }
                })
                , t = (n["language-" + t] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[t]
            },
                {});
            t[e] = {
                pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
                    return e
                }), "i"),
                lookbehind: !0,
                greedy: !0,
                inside: n
            },
                Prism.languages.insertBefore("markup", "cdata", t)
        }
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        value: function (e, t) {
            Prism.languages.markup.tag.inside["special-attr"].push({
                pattern: RegExp(/(^|["'\s])/.source + "(?:" + e + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
                lookbehind: !0,
                inside: {
                    "attr-name": /^[^\s=]+/,
                    "attr-value": {
                        pattern: /=[\s\S]+/,
                        inside: {
                            value: {
                                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                                lookbehind: !0,
                                alias: [t, "language-" + t],
                                inside: Prism.languages[t]
                            },
                            punctuation: [{
                                pattern: /^=/,
                                alias: "attr-equals"
                            }, /"|'/]
                        }
                    }
                }
            })
        }
    }),
    Prism.languages.css = Prism.languages.markup,
    Prism.languages.html = Prism.languages.markup,
    Prism.languages.mathml = Prism.languages.markup,
    Prism.languages.svg = Prism.languages.markup,
    Prism.languages.xml = Prism.languages.extend("markup", {}),
    Prism.languages.ssml = Prism.languages.xml,
    Prism.languages.atom = Prism.languages.xml,
    Prism.languages.rss = Prism.languages.xml,
    function (e) {
        var t = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/
            , t = (e.languages.css = {
            //"doc-comment": /\/\*\*[\s\S]*?\*\//,
            //atrule: {
            //    pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + t.source + ")*?" + /(?:;|(?=\s*\{))/.source),
            //    inside: {
            //        rule: /^@[\w-]+/,
            //        "selector-function-argument": {
            //            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            //            lookbehind: !0,
            //            alias: "selector"
            //        },
            //        keyword: {
            //            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            //            lookbehind: !0
            //        }
            //    }
            //},
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + t.source + ")*?" + /(?:;|(?=\s*\{))/.source),
                inside: {
                    rule: /^@[\w-]+/,
                    "selector-function-argument": {
                        pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: "selector"
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0
                    }
                }
            },
            url: {
                pattern: RegExp("\\burl\\((?:" + t.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp("^" + t.source + "$"),
                        alias: "url"
                    }
                }
            },
            selector: {
                pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + t.source + ")*(?=\\s*\\{)"),
                lookbehind: !0
            },
            string: {
                pattern: t,
                greedy: !0
            },
            property: {
                pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
                lookbehind: !0
            },
            important: /!important\b/i,
            function: {
                pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
                lookbehind: !0
            },
            punctuation: /[(){};:,]/
        },
            e.languages.css.atrule.inside.rest = e.languages.css,
            e.languages.markup);
        t && (t.tag.addInlined("style", "css"),
            t.tag.addAttribute("style", "css"))
    }(Prism),
    Prism.languages.clike = {
        //macro: {
        //    pattern: /\b[A-Z_][A-Z0-9_]*(?=\b)/,
        //    alias: "macro",
        //    greedy: true
        //},
        "doc-comment": {
            pattern: /\/\*\*[\s\S]*?\*\//, // Doc comments
            alias: "doc-comment", // Alias this as your custom class
            greedy: true
        },

        comment: [{
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: !0,
            greedy: !0
        }],
        string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0
        },
        "struct-name-cpp": /\b(FTileState|FVector2D|FVector3D|FIntPoint|FMath)\b/,
        "class-name": {
            pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: {
                punctuation: /[.\\]/
            }
        },
        "class-name-cpp": /\b(TStaticArray|Blueprintable|BlueprintType|BlueprintCallable|Category|TArray|TMap|UObject|std|string|FString|FText|FName)\b/,
        keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        boolean: /\b(?:false|true)\b/,
        "macro-name-cpp": /\b[A-Z_][A-Z0-9_]*(?=\b)/,
        function: /\b\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/
    },
    Prism.languages.javascript = Prism.languages.extend("clike", {
        //"doc-comment": {
        //    pattern: /\/\*\*[\s\S]*?\*\//, // Doc comments
        //    alias: "doc-comment", // Alias this as your custom class
        //    lookbehind: !0
        //},
        "class-name": [Prism.languages.clike["class-name"], {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: !0
        }],
        keyword: [{
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: !0
        }, {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0
        }],
        function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: {
            pattern: RegExp(/(^|[^\w$])/.source + "(?:" + /NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source + ")" + /(?![\w$])/.source),
            lookbehind: !0
        },
        operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }),
    Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,

    //Prism.languages.insertBefore("clike", "function", {
    //    macro: {
    //        pattern: /\b[A-Z_][A-Z0-9_]*(?=\b)/, // Match all-uppercase words
    //        alias: "macro", // Style as macro
    //        greedy: true,   // Ensure it captures full tokens
    //    },
//});


    Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
            lookbehind: !0,
            greedy: !0,
            inside: {
                "regex-source": {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: "language-regex",
                    inside: Prism.languages.regex
                },
                "regex-delimiter": /^\/|\/$/,
                "regex-flags": /^[a-z]+$/
            }
        },
        "function-variable": {
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: "function"
        },
        parameter: [{
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }),
    Prism.languages.insertBefore("javascript", "string", {
        hashbang: {
            pattern: /^#!.*/,
            greedy: !0,
            alias: "comment"
        },
        "template-string": {
            pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": {
                    pattern: /^`|`$/,
                    alias: "string"
                },
                interpolation: {
                    pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\$\{|\}$/,
                            alias: "punctuation"
                        },
                        rest: Prism.languages.javascript
                    }
                },
                string: /[\s\S]+/
            }
        },
        "string-property": {
            pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
            lookbehind: !0,
            greedy: !0,
            alias: "property"
        }
    }),

    //Prism.languages.insertBefore("javascript", "doc-coment", {
    //    "doc-comment": {
    //        pattern: /\/\*\*[\s\S]*?\*\//, // Matches comments starting with `/**`
    //        alias: "doc-comment" // Assigns your custom class
    //    }
    //});
    Prism.languages.insertBefore("javascript", "operator", {
        "literal-property": {
            pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
            lookbehind: !0,
            alias: "property"
        }
    }),
Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"),
    Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript")),
    Prism.languages.js = Prism.languages.javascript,
    function () {
        var l, u, g, c, e;
        void 0 !== Prism && "undefined" != typeof document && (Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
            l = {
                js: "javascript",
                py: "python",
                rb: "ruby",
                ps1: "powershell",
                psm1: "powershell",
                sh: "bash",
                bat: "batch",
                h: "c",
                tex: "latex"
            },
            c = "pre[data-src]:not([" + (u = "data-src-status") + '="loaded"]):not([' + u + '="' + (g = "loading") + '"])',
            Prism.hooks.add("before-highlightall", function (e) {
                e.selector += ", " + c
            }),
            // Prism.hooks.add('before-highlight', function (e) {
            //     //console.log("Processing Element:", e.element.outerHTML);
            //     const snippetId = e.element.getAttribute('id');
            //     console.log("DATA SNIPPET ID: ", snippetId);
            //     //if (snippetId === 'ServerSideNetworkUpdate') {
            //     if (true) {
            //     console.log("Hey, it worked");
            //         Prism.languages.insertBefore('clike', 'class-name', {
            //             "custom-class": {
            //                 pattern: /\b(updatedGameStats_Arrays|GameStats_Arrays)\b/,
            //                 alias: "class"
            //             }
            //         });
            //     }
            // }),
            Prism.hooks.add("before-sanity-check", function (e) {
                var r, t, n, a, s, i, o = e.element;
                o.matches(c) && (e.code = "",
                    o.setAttribute(u, g),
                    (r = o.appendChild(document.createElement("CODE"))).textContent = "Loading…",
                    t = o.getAttribute("data-src"),
                "none" === (e = e.language) && (n = (/\.(\w+)$/.exec(t) || [, "none"])[1],
                    e = l[n] || n),
                    Prism.util.setLanguage(r, e),
                    Prism.util.setLanguage(o, e),
                (n = Prism.plugins.autoloader) && n.loadLanguages(e),
                    n = t,
                    a = function (e) {
                        o.setAttribute(u, "loaded");
                        var t, n, a = function (e) {
                            var t, n;
                            if (e = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e || ""))
                                return t = Number(e[1]),
                                    n = e[2],
                                    e = e[3],
                                    n ? e ? [t, Number(e)] : [t, void 0] : [t, t]
                        }(o.getAttribute("data-range"));
                        a && (t = e.split(/\r\n?|\n/g),
                            n = a[0],
                            a = null == a[1] ? t.length : a[1],
                        n < 0 && (n += t.length),
                            n = Math.max(0, Math.min(n - 1, t.length)),
                        a < 0 && (a += t.length),
                            a = Math.max(0, Math.min(a, t.length)),
                            e = t.slice(n, a).join("\n"),
                        o.hasAttribute("data-start") || o.setAttribute("data-start", String(n + 1))),
                            r.textContent = e,
                            Prism.highlightElement(r)
                    }
                    ,
                    s = function (e) {
                        o.setAttribute(u, "failed"),
                            r.textContent = e
                    }
                    ,
                    (i = new XMLHttpRequest).open("GET", n, !0),
                    i.onreadystatechange = function () {
                        4 == i.readyState && (i.status < 400 && i.responseText ? a(i.responseText) : 400 <= i.status ? s("✖ Error " + i.status + " while fetching file: " + i.statusText) : s("✖ Error: File does not exist or is empty"))
                    }
                    ,
                    i.send(null))
            }),

        e = !(Prism.plugins.fileHighlight = {
            highlight: function (e) {
                for (var t, n = (e || document).querySelectorAll(c), a = 0; t = n[a++];)
                    Prism.highlightElement(t)
            }
        }),
            Prism.fileHighlight = function () {
                e || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),
                    e = !0),
                    Prism.plugins.fileHighlight.highlight.apply(this, arguments)
            }
    )
    }();
