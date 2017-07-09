<template>
  <div id="app" class="container">
    <div class="field">
      <label class="label">Coin</label>
      <p class="control">
        <input class="input" type="text" v-model="coinFilter" placeholder="filter">
      </p>
      <p class="control">
        <span class="select">
          <select style="width: 100%" v-model="selectedCoin">
            <option v-for="coin in filteredCoins" :value="coin.val">{{coin.name}}</option>
          </select>
        </span>
      </p>
    </div>
    <div class="content">
      <h1>{{peers}}</h1>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'

export default {
  name: 'app',
  data: () => ({
    data: {},
    coins: [],
    coinFilter: '',
    selectedCoin: ''
  }),
  watch: {
    'selectedCoin': function(newSelected) {
      fetch('https://wt-3d0cd016b91ca1f520c939dce0992a63-0.run.webtask.io/cryptoid/peers?coin=' + newSelected)
        .then(res=> res.json())
        .then(res => {
          this.data = res;
        });
    }
  },
  mounted() {
    fetch('https://wt-3d0cd016b91ca1f520c939dce0992a63-0.run.webtask.io/cryptoid')
      .then(res => res.json())
      .then(res => {
        this.coins = Object.keys(res).map(k => ({ name: res[k].name, val: k }))
      });
  },
  computed: {
    peers() {
      if (this.data && this.data.peers) {
        return this.data.peers.map(d => d.nb).reduce((a,b) => a+b);
      }
    },
    filteredCoins() {
      return this.coins.filter(c => c.name.toLowerCase().indexOf(this.coinFilter.toLowerCase()) > -1 || c.val.toLowerCase().indexOf(this.coinFilter.toLowerCase()) > -1)
    }
  },
  components: {
    Hello
  }
}
</script>

<style lang="css">
  .container {
    padding: 1rem;
  }
  .select {
    width: 100%;
  }
  select {
    width: 100%;
  }
</style>