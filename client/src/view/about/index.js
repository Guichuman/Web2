import './about.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function About() {

 
  
  return (
    <div>
      <Header />
        <div className='containerAbout'>
            <section>
                <div className='conteudoAbout'>
                    <h1 className='h1Home'>Tecnologias utilizadas</h1>
                    <ul className='ulAbout'>
                        <li className='liAbout'>Nodejs</li>
                        <li className='liAbout'>Reactjs</li>
                        <li className='liAbout'>Express</li>
                        <li className='liAbout'>MySQL</li>
                        <li className='liAbout'>Sequelize</li>
                        <li className='liAbout'>Axios</li>
                        <li className='liAbout'>Cors</li>
                        <li className='liAbout'>Jsonwebtoken</li>
                        <li className='liAbout'>Bcrypt</li>
                    </ul>
                </div>
            </section>
            <section>
                <div className='conteudoAbout'>
                    <h1 className='h1Home'>Desenvolvedor</h1>
                    <h2 className='h2Desenvolvedor'>Guilherme Chuman</h2>
                    <div className='containerAboutDescricao'>

                      <br/>
                      <p className='textoAbout'>Estudante de Engenharia de Software na UTFPR, atualmente fazendo o meu melhor para aprimorar minhas skills em web, tanto frontend quanto backend, visando aprender todo o ciclo de vida de um software.</p>
                      <br/>
                      <p className='textoAbout'>Apaixonado por música principalmente rock e rap, no meu tempo livre costumo jogar jogos onlines competitivos, e no meu tempo "offline" gosto de treinar ou caminhar.</p>
                    </div>
                </div>
            </section>
        </div>
      <Footer />
    </div>
  );
}

export default About;
