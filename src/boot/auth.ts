import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth-store';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(
  async ({ urlPath, redirect } /* { app, router, ... } */) => {
    const auth = useAuthStore();
    auth.import();
    if (urlPath.includes('dashboard') && !urlPath.includes('login')) {
      if (!auth.isAuthorized) {
        redirect({ name: 'login' });
        return;
      }
    } else if (urlPath.includes('login')) {
      if (auth.isAuthorized) {
        redirect({ name: 'dashboard' });
        return;
      }
    }
  }
);
