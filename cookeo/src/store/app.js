// Utilities
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const list_plat = ref([]);
  const list_categorie = ref([]);

  const user = ref({
    nom: null,
    email: null,
    tel: null
  })

  const list_cart = ref([]);

  axios.get('http://localhost:3001/api/produit').then((data) => {
    list_plat.value = data.data;
  })
  axios.get('http://localhost:3001/api/categorie').then((data) => {
    list_categorie.value = data.data;
  })

  function get_cart(){
    let cart_temp = localStorage.getItem('cart_list');
    if (cart_temp){
      list_cart.value = JSON.parse(cart_temp)
    }else{
      list_cart.value = [];
      localStorage.setItem('cart_list', JSON.stringify(list_cart.value));
    }

    return list_cart;
  }
  function add_cart(cart_item){
    list_cart.value = get_cart();
    console.log(list_cart.value);
    list_cart.value.push(cart_item)
    localStorage.setItem('art_list', JSON.stringify(list_cart.value))
  }
  function get_plat() {
    axios.get('http://localhost:3001/api/produit').then((data) => {
      list_plat.value = data.data;
      return list_plat;
    })
  }
  function get_categorie() {
    axios.get('http://localhost:3001/api/categorie').then((data) => {
      list_categorie.value = data.data;
    })
    return list_categorie;
  }

  function set_user(new_user){
    user.value = new_user;
  }

  return { list_plat, get_plat, list_categorie, get_categorie, list_cart, get_cart, add_cart , user, set_user}

})


