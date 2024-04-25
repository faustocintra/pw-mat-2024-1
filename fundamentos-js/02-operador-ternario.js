let media = 8.3, resultado

if(media >= 6) {
  resultado = 'APROVADO'
}
else {
  resultado = 'Reprovado'
}

console.log({media, resultado})

// Usando o operador ternário
resultado = media >= 6 ? 'APROVADO' : 'Reprovado'

console.log({media, resultado})

let user = 'guest', msg

/*
  Quando há apenas uma linha depois de um if, um else, um while,
  etc., podemos omitir as chaves
*/
if(user === 'admin') msg = 'Seja bem-vindo(a)!'
else msg = 'Acesso negado'

console.log({user, msg})

// Equivalente usando operador ternário
msg = user === 'admin' ? 'Seja bem-vindo(a)!' : 'Acesso negado'

console.log({user, msg})