
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    import {loadShare} from "@module-federation/runtime";
    const importMap = {
      
        "@axiom/mfe-lib-shared": async () => {
          let pkg = await import("__mf__virtual/mainApp__prebuild___mf_0_axiom_mf_1_mfe_mf_2_lib_mf_2_shared__prebuild__.js");
            return pkg;
        }
      ,
        "@tanstack/react-query": async () => {
          let pkg = await import("__mf__virtual/mainApp__prebuild___mf_0_tanstack_mf_1_react_mf_2_query__prebuild__.js");
            return pkg;
        }
      ,
        "i18next": async () => {
          let pkg = await import("__mf__virtual/mainApp__prebuild__i18next__prebuild__.js");
            return pkg;
        }
      ,
        "react": async () => {
          let pkg = await import("__mf__virtual/mainApp__prebuild__react__prebuild__.js");
            return pkg;
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/mainApp__prebuild__react_mf_2_dom__prebuild__.js");
            return pkg;
        }
      ,
        "react-helmet-async": async () => {
          let pkg = await import("__mf__virtual/mainApp__prebuild__react_mf_2_helmet_mf_2_async__prebuild__.js");
            return pkg;
        }
      ,
        "react-i18next": async () => {
          let pkg = await import("__mf__virtual/mainApp__prebuild__react_mf_2_i18next__prebuild__.js");
            return pkg;
        }
      ,
        "react-router": async () => {
          let pkg = await import("__mf__virtual/mainApp__prebuild__react_mf_2_router__prebuild__.js");
            return pkg;
        }
      ,
        "zustand": async () => {
          let pkg = await import("__mf__virtual/mainApp__prebuild__zustand__prebuild__.js");
            return pkg;
        }
      
    }
      const usedShared = {
      
          "@axiom/mfe-lib-shared": {
            name: "@axiom/mfe-lib-shared",
            version: "0.0.0",
            scope: ["default"],
            loaded: false,
            from: "mainApp",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@axiom/mfe-lib-shared"}' must be provided by host`);
              }
              usedShared["@axiom/mfe-lib-shared"].loaded = true
              const {"@axiom/mfe-lib-shared": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@axiom/mfe-lib-shared" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^0.0.0",
              
            }
          }
        ,
          "@tanstack/react-query": {
            name: "@tanstack/react-query",
            version: "5.96.2",
            scope: ["default"],
            loaded: false,
            from: "mainApp",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@tanstack/react-query"}' must be provided by host`);
              }
              usedShared["@tanstack/react-query"].loaded = true
              const {"@tanstack/react-query": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@tanstack/react-query" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.96.2",
              
            }
          }
        ,
          "i18next": {
            name: "i18next",
            version: "26.0.0",
            scope: ["default"],
            loaded: false,
            from: "mainApp",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"i18next"}' must be provided by host`);
              }
              usedShared["i18next"].loaded = true
              const {"i18next": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "i18next" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^26.0.0",
              
            }
          }
        ,
          "react": {
            name: "react",
            version: "19.0.0",
            scope: ["default"],
            loaded: false,
            from: "mainApp",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react"}' must be provided by host`);
              }
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.0.0",
              
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.0.0",
            scope: ["default"],
            loaded: false,
            from: "mainApp",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-dom"}' must be provided by host`);
              }
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-dom" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.0.0",
              
            }
          }
        ,
          "react-helmet-async": {
            name: "react-helmet-async",
            version: "3.0.0",
            scope: ["default"],
            loaded: false,
            from: "mainApp",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-helmet-async"}' must be provided by host`);
              }
              usedShared["react-helmet-async"].loaded = true
              const {"react-helmet-async": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-helmet-async" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^3.0.0",
              
            }
          }
        ,
          "react-i18next": {
            name: "react-i18next",
            version: "17.0.0",
            scope: ["default"],
            loaded: false,
            from: "mainApp",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-i18next"}' must be provided by host`);
              }
              usedShared["react-i18next"].loaded = true
              const {"react-i18next": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-i18next" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^17.0.0",
              
            }
          }
        ,
          "react-router": {
            name: "react-router",
            version: "7.0.0",
            scope: ["default"],
            loaded: false,
            from: "mainApp",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-router"}' must be provided by host`);
              }
              usedShared["react-router"].loaded = true
              const {"react-router": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-router" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^7.0.0",
              
            }
          }
        ,
          "zustand": {
            name: "zustand",
            version: "5.0.0",
            scope: ["default"],
            loaded: false,
            from: "mainApp",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"zustand"}' must be provided by host`);
              }
              usedShared["zustand"].loaded = true
              const {"zustand": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "zustand" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.0.0",
              
            }
          }
        
    }
      const usedRemotes = [
                {
                  entryGlobalName: "remote1App",
                  name: "remote1App",
                  type: "module",
                  entry: "http://redsky0212.dothome.co.kr/2026/mfe-multirepo/remote1/remote1Entry.js",
                  shareScope: "default",
                }
          
      ]
      export {
        usedShared,
        usedRemotes
      }
      