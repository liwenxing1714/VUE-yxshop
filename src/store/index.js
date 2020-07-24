import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersist from 'vuex-persist'
//import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

let vuexLocal = new vuexPersist({
    key: "vuex1",
    storage: window.localStorage
});

const store = new Vuex.Store({
    // 全局状态
    state:{
       isLoading:false,
       a:1
      // carList:[1,2,2]
    },
    // 同步方法集合
    mutations:{
      addCount(state,num) {
            
         state.count  = num
     }
    },
    actions:{
      
    },
    getters:{},
    modules:{},
    plugins  :  [  vuexLocal.plugin  ]
   // plugins: [createPersistedState()]
});

export default store;