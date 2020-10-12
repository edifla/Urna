let seuVotoPara = document.querySelector('.d-1-1 span');//Pegando controle das divs
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral =document.querySelector('.d1--right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    numero='';
    let numeroHtml= '';
    votoBranco = false;
    
    for( let i= 0; i< etapa.numero ; i++){//Gerando o número de quadradinhos de acordo com o numero da etapa
        if( i === 0){
            numeroHtml += '<div class="numero pisca"></div>'    
        }else
        numeroHtml += '<div class="numero"></div>'
    }

    seuVotoPara.style.display ='none';//Configurando a tela
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML ='';
    aviso.style.display ='none';
    lateral.innerHTML='';
    numeros.innerHTML= numeroHtml;
}

function atualizainterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.canditados.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
        if(candidato.length > 0){
            candidato = candidato[0];
            seuVotoPara.style.display ='block';
            aviso.style.display = 'block';
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
            

        let fotosHtml = "";
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="/imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }else{
                fotosHtml += `<div class="d-1-image"><img src="/imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHtml;
        }else{
            seuVotoPara.style.display ='block';
            aviso.style.display = 'block';
            descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO </div>`;
        }
}  

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca')
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero =`${numero}${n}`;

        elNumero.classList.remove('pisca')//class list acessa a classe
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')//nextelementsibling pega o proximo elemento da classe
        }else{
            atualizainterface()
        }
    }
}
function branco(){
   if(numero === ''){
    votoBranco = true;
    seuVotoPara.style.display ='block';
    aviso.style.display ='block';
    numeros.innerHTML= '';
    lateral.innerHTML='';
    descricao.innerHTML =`<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
   }else{
       alert("Para votar em branco, não se pode ter digitado nenhum número, aperte  CORRIGE e tente novamente");
   }
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado= true;
        console.log("Confirmando como branco");
    }else if(numero.length === etapa.numero){
        votoConfirmado = true;
        console.log('confirmado como '+numero)
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`;
        }
    }
}
    comecarEtapa()