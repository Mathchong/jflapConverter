# jflapConverter
Uma ferramenta que transforma o arquivo .jff de um Autômato Finito Determinístico na fórmula do AFD e cita todas suas transições.

## Como executar
Ao criar um Automato Finito Deterministico pelo jflap o arquivo com todas suas informações é salvo com a extensão .jff, seu conteúdo é em formato XML.\
Ele é estruturado em tags `<state>` e `<transition>`.

- Renomeie o arquivo para "convert.txt" e o salve na mesma pasta que o "convert.js".
- Execute o código com o comando `node convert.js`

Prontinho, aparecerá no terminal a fórmula criada e suas transições!

## Explicações do código

### Tag State
A tag `<state>` tem o seguinte formato:
```
<state id="0" name="q0">&#13;
    <x>83.0</x>&#13;
    <y>127.0</y>&#13;
    <initial/>&#13;
    <final/>&#13;
</state>&#13;
```
Dessa forma é possível saber:
- O nome do estado pelo atributo "name"
- O identificador do estado, pelo atributo "id"
- Se é um estado incial, caso possua a Tag `<initial/>`
- Se é um estado final, caso possua a Tag `<final/>`
- As cordenadas na ferramenta jflap, pelo texto das Tags `<x>` e `<y>`. Essa informação não é utilizada nesse código


### Tag Transition

```
<transition>&#13;
    <from>5</from>&#13;
    <to>5</to>&#13;
    <read>0</read>&#13;
</transition>&#13;
```

Dessa forma é possivel saber:
- De qual estado a transição parte, pelo texto da tag `<from>` que é o atributo "id" do estado.
- Para qual estado a transição vai, pelo texto da tag `<to>` que é o atributo "id" do estado.
- Qual o caractere lido nessa transição, pelo texto da tag `<read>`. Todos os diferentes caracteres lidos formarão o alfabeto.

### Fórmula Gerada
A partir das tags `<state>` e `<transition>` é possível criar a fórmula do AFD:\
AFD = (E, ∑, δ, i, f)\

Relembrando o que é cada parte da fórmula:
- 'E' é o conjuno de todos os estados, será apresentado da forma E={q0,q1,q2}
- '∑' é o alfabeto conhecido pelo automato, será apresentado da forma ∑={0,1,2}
- 'δ' são as fórmulas das transições de cada estado do automato, esse simbolo não será substituido, a lista será apresentada abaixo da formula.
- 'i' é o estado inicial, será apresentado da forma i={q0}
- 'f' é o conjunto dos estados finais, será apresentado da forma f={q0,q1,q2}

Essa fórmula preenchida será exibida no terminal, as transições serão exibidas em forma de lista abaixo da fórmula.

### Lista de Transições
A lista de transições será exibida em ordem alfabética, iniciando com as transições do q0, depois q1 e assim consecutivamente.\
Outro padrão de nome de estados também serão ordenados.

O Formato da lista seguirá o seguinte:\
δ(Nome do estado inicial,caractere lido) = nome do estado final.\
Exemplo: δ(q0,0) = q1

## Atenção
- O objetivo desse código foi criar uma ferramenta simples para passar a estrutura do automato do arquivo jflap para a formula descrita.
- O Código não foi criado com o intúito de estar otimizido, por ser um baixo volume de dados a cada entrada
- Não garanto que em 100% dos casos a fórmula estará correta, pois o sistema foi construido baseado no meu entendimento do conteudo de 2 aulas até agora.
- Por favor revise e confira as informações baseadas no automato criado por você.
