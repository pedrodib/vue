import Vue from 'vue'
import {Time} from './time'
import _ from 'lodash'

require('style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');

new Vue({
  	el: '#app',
  	data: {
  		order: {
  			keys: [
  				'pontos', 'gm', 'gs'
  			],
  			sort: [
  				'desc', 'desc', 'asc'
  			]
  		},
  		filter: '',
  		colunas: [
  			'nome', 'pontos', 'gm', 'gs', 'saldo'
  		],
	  	times: [
	  		new Time("América MG", require("./assets/america-mg.png")),
	  		new Time("Atletico MG", require("./assets/atletico-mg.png")),
	  		new Time("Bahia", require("./assets/bahia.png")),
	  		new Time("Chapecoense", require("./assets/chapecoense.png")),
	  		new Time("Corinthians", require("./assets/corinthians.png")),
	  		new Time("Cruzeiro", require("./assets/cruzeiro.png")),
	  		new Time("Fluminense", require("./assets/fluminense.png")),
	  		new Time("Grêmio", require("./assets/gremio.png")),
	  		new Time("Internacional", require("./assets/internacional.png")),
	  		new Time("Palmeiras", require("./assets/palmeiras.png")),
	  		new Time("Portuguesa", require("./assets/portuguesa.png")),
	  		new Time("Santos", require("./assets/santos.png")),
	  		new Time("São Paulo", require("./assets/sao-paulo.png")),
	  		new Time("Sport", require("./assets/sport.png")),
	  		new Time("Vasco", require("./assets/vasco.png")),
	  	],
	  	novoJogo: {
	  		casa: {
	  			time: null,
	  			gols: 0
	  		},
	  		fora: {
	  			time: null,
	  			gols: 0
	  		}
	  	},
	  	view: 'tabela' 
  	},
  	methods: {
  		fimJogo() {
  			let timeAdversario = this.novoJogo.fora.time,
  				golsAdversario = +this.novoJogo.fora.gols,
  				golsCasa = +this.novoJogo.casa.gols;

  			this.novoJogo.casa.time.fimJogo(timeAdversario, golsCasa, golsAdversario);
  			
	  		this.view = 'tabela';
  		},
  		createNovoJogo() {
  			let indexCasa = Math.floor(Math.random() * 10),
  				indexFora = Math.floor(Math.random() * 10),
  				casa = this.novoJogo.casa,
  				fora = this.novoJogo.fora;

	  		casa.time = this.times[indexCasa];
	  		casa.gols = 0;

	  		fora.time = this.times[indexFora];
	  		fora.gols = 0;

	  		this.view = 'novoJogo';
  		},
  		sortBy(coluna) {
  			this.order.keys = coluna;
  			this.order.sort = this.order.sort == 'asc' ? 'desc' : 'asc';
  		}
  	},
  	computed: {
  		timesFiltered() {
  			let order 	= this.order,
  				colecao = _.orderBy(this.times, order.keys, order.sort);
  		
  			return _.filter(colecao, item => {
  				return item.nome.indexOf(this.filter) >= 0;
  			});
  		}
  	},
  	filters: {
  		saldo(time) {

  			return time.gm - time.gs;
  		},
  		ucwords(value) {
  			return value.charAt(0).toUpperCase() + value.slice(1);
  		}

  	}
});
