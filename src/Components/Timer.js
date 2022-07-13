import React, {useState, useEffect} from 'react'


const Timer = () => {
  var intervalo;

  const [HorasLogadas, SetHorasLogada] = useState(0)
  const [MinutosLogados, SetMinutosLogados] = useState(0)
  const [SegundosLogados, SetSegundosLogados] = useState(0)

  const [TimerHorasLogadas, SetTimerHorasLogadas] = useState('00:')
  const [TimerMinutosLogados, SetTimerMinutosLogados] = useState('00:')
  const [TimerSegundosLogados, SetTimerSegundosLogados] = useState('00')

  const pause = () => {
    clearInterval(intervalo)
  }

  const GetTempoLogado = () => {
    var h = HorasLogadas;
    var m = MinutosLogados;
    var s = SegundosLogados;


    if (s == 60) { SetMinutosLogados(MinutosLogados + 1); SetSegundosLogados(0); }
    if (m == 60) { SetHorasLogada(HorasLogadas + 1); SetSegundosLogados(0); SetMinutosLogados(0); }

    if (h < 10) { SetTimerHorasLogadas(`0${h}:`) }else { SetTimerHorasLogadas(`${h}:`) }
    if (m < 10) { SetTimerMinutosLogados(`0${m}:`) }else { SetTimerMinutosLogados(`${m}:`)}
    if (s < 10) { SetTimerSegundosLogados(`0${s}`) }else{ SetTimerSegundosLogados(`${s}`)}

    if(SegundosLogados == 60) { SetSegundosLogados(0) } else{ SetSegundosLogados(SegundosLogados + 1)}
  }

  useEffect(() => {

    intervalo = setInterval(() => {
        GetTempoLogado()
      }, 1000);

    return () => clearInterval(intervalo);

  })

  return <>
    <span>{TimerHorasLogadas}{TimerMinutosLogados}{TimerSegundosLogados}</span>
    <br/>
    <button onClick={ () => pause() }>Pausa</button>
  </>
}

export default Timer
