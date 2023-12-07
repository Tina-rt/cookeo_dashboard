<script>
import { useAppStore } from '@/store/app';

export default {
    data() {
        let app_store = useAppStore();
        return {
            app_store: app_store,
        }
    }    
}
</script>

<template>
    <div class="main-cart">
        <h2>Mon Panier</h2>
        <div class="cart-list">
            <div class="cart-element">
                
            </div>
        </div>
        
    </div>
</template>