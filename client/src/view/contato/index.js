import './contato.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Contato() {

  
  return (
    <div>
      <Header />
        <div className='containerContato'>
            <h1 className='h1Contato'>Entre em contato conosco</h1>
            <textarea className='textContato' placeholder='Digite sua mensagem' />
            <input className='inputContato' placeholder='Digite seu email'  />
            <button className='btnContato'>Enviar mensagem</button>
        </div>
      <Footer />
    </div>
  );
}

export default Contato;
