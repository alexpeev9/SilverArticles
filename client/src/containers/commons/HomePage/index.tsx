import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div id='main' className='wrapper style2'>
      <div className='title'>No Sidebar</div>
      <div className='container'>
        <div id='content'>
          <article className='box post'>
            <header className='style1'>
              <h2>
                Lorem ipsum dolor sit amet magna egestas
                <br className='mobile-hide' />
                morbi bibendum sed malesuada
              </h2>
              <p>Tempus feugiat veroeros sed nullam dolore</p>
            </header>
            <Link to='/' className='image featured'>
              <img src='images/pic01.jpg' alt='' />
            </Link>
            <p>
              Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis
              sagittis eget. odio eleifend. Duis commodo fringilla commodo.
              Aliquam erat volutpat. Vestibulum facilisis leo magna. Cras sit
              amet urna eros, id egestas urna. Quisque aliquam tempus euismod.
              Vestibulum ante ipsum primis in faucibus.
            </p>
            <p>
              Phasellus nisl nisl, varius id porttitor sed, pellentesque ac
              orci. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Morbi bibendum justo sed mauris
              vehicula malesuada aliquam elit imperdiet. Aliquam eu nibh lorem,
              eget gravida mi. Duis odio diam, luctus et vulputate vitae,
              vehicula ac dolor. Pellentesque at urna eget tellus lobortis
              ultrices sed non erat. Donec eget erat non magna volutpat
              malesuada quis eget eros. Nullam sodales cursus sapien, id
              consequat leo suscipit ut. Praesent id turpis vitae turpis pretium
              ultricies. Vestibulum sit amet risus elit.
            </p>
            <p>
              Donec consectetur vestibulum dolor et pulvinar. Etiam vel felis
              enim, at viverra ligula. Ut porttitor sagittis lorem, quis
              eleifend nisi ornare vel. Praesent nec orci eget quam rutrum
              bibendum. Proin pellentesque diam non ligula commodo tempor.
              Vivamus eget urna nibh. Curabitur non fringilla nisl. Donec
              accumsan interdum nisi, quis tincidunt felis sagittis eget. Donec
              elementum ligula dignissim sem pulvinar non semper odio eleifend.
              Duis commodo fringilla commodo. Aliquam erat volutpat. Vestibulum
              facilisis leo magna. Cras sit amet urna eros, id egestas urna.
              Quisque aliquam tempus euismod. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia.
            </p>
            <p>
              Phasellus nisl nisl, varius id porttitor sed, pellentesque ac
              orci. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Morbi bibendum justo sed mauris
              vehicula malesuada aliquam elit imperdiet. Aliquam eu nibh lorem,
              eget gravida mi. Duis odio diam, luctus et vulputate vitae,
              vehicula ac dolor. Pellentesque at urna eget tellus lobortis
              ultrices sed non erat. Donec eget erat non magna volutpat
              malesuada quis eget eros. Nullam sodales cursus sapien, id
              consequat leo suscipit ut. Praesent id turpis vitae turpis pretium
              ultricies. Vestibulum sit amet risus elit.
            </p>
          </article>
        </div>
      </div>
    </div>
  )
}

export default HomePage
