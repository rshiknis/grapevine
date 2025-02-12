/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/App`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/src/firebase/config`; params?: Router.UnknownInputParams; } | { pathname: `/src/screens/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/src/screens/RegisterScreen`; params?: Router.UnknownInputParams; } | { pathname: `/src/screens/firebaseConfig`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/App`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/src/firebase/config`; params?: Router.UnknownOutputParams; } | { pathname: `/src/screens/LoginScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/src/screens/RegisterScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/src/screens/firebaseConfig`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/App${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/src/firebase/config${`?${string}` | `#${string}` | ''}` | `/src/screens/LoginScreen${`?${string}` | `#${string}` | ''}` | `/src/screens/RegisterScreen${`?${string}` | `#${string}` | ''}` | `/src/screens/firebaseConfig${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/App`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/src/firebase/config`; params?: Router.UnknownInputParams; } | { pathname: `/src/screens/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/src/screens/RegisterScreen`; params?: Router.UnknownInputParams; } | { pathname: `/src/screens/firebaseConfig`; params?: Router.UnknownInputParams; };
    }
  }
}
