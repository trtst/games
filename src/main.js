import { createApp, h, defineAsyncComponent } from 'vue';
import routes from '/src/router/route.js';

import './assets/less/common.less';

const SimpleRouterApp = {
    data: () => ({
        currentRoute: window.location.pathname
    }),

    computed: {
        ViewComponent () {
            const matchingPage = routes[this.currentRoute] || '404';
            return defineAsyncComponent(() => import(`./views/${matchingPage}.vue`))
        }
    },

    render () {
        return h(this.ViewComponent)
    },

    created () {
        window.addEventListener('popstate', () => {
            this.currentRoute = window.location.pathname
        })
    }
}

createApp(SimpleRouterApp).mount('#app')