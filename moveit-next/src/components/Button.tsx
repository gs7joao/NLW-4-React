import { useState } from 'react'

interface ButtonProps {
  color: string;
  children: string;
}

/*Interface funciona como o typescript, vai ser uma tipagem de propriedades/atributos que podemos passar em nossos componentes,
parecido com o attr(atributo) no HTML */
export function Button(props: ButtonProps) {
  const [counter, setCounter] = useState(1);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button 
      type="button"
      style={{ backgroundColor: props.color }}
      onClick={increment}
      >
      {props.children} <strong> {counter} </strong>
    </button>
  )
}