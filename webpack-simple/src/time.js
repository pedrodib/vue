export class Time {

	constructor(nome, escudo) {
		this.nome 	= nome;
		this.escudo = escudo;

		this.pontos = 0;
		this.gm 	= 0;
		this.gs 	= 0;
	}

	updateInfo(pontos, golsMarcados, golsSofridos) {
		this.pontos += pontos;
		this.gm 	+= golsMarcados;
		this.gs 	+= golsSofridos;
	}

	fimJogo(timeAdversario, golsPro, golsContra) {
		var pontos = 1;
		var pontosAdversario = 1;
		
		if(golsPro > golsContra) {
			pontos = 3;
			pontosAdversario = 0;
		}else if(golsPro < golsContra) {
			pontos = 0;
			pontosAdversario = 3;
		}
		
		this.updateInfo(pontos, golsPro, golsContra);
		timeAdversario.updateInfo(pontosAdversario, golsContra, golsPro);
	}
}