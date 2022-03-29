export default function Index() {
  return (
    <div>
      <div className="stack">
          <h1 className="title">MartianRover.com</h1>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mars_2020_JPL_second_insignia.svg" width="20%" />
          <h3 className="subtitle">
              Perseverance successfully landed on Mars near Jezero Crater on 18 February 2021 at 21:01 UTC.
          </h3>
          <a href="https://en.wikipedia.org/wiki/Jezero_(crater)" style={{ maxWidth: '80%' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/260184-JezeroCrater-Delta-Full.jpg/898px-260184-JezeroCrater-Delta-Full.jpg" />
          </a>
      </div>


    <h2 className="stack">NASA’s Ingenuity Mars Helicopter</h2>
    <div className="iframe-container">
        <iframe src="https://www.youtube.com/embed/qwdfdE6ruMw" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>

    <h2 className="stack">JPL's Mars Science Laboratory Curiosity rover animation</h2>
    <div className="iframe-container">
        <iframe src="https://www.youtube.com/embed/P4boyXQuUIw" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>

    <h2 className="stack">See how NASA's Perseverance rover will land on Mars.</h2>
    <div className="iframe-container">
        <iframe src="https://www.youtube.com/embed/M4tdMR5HLtg" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>

    <h2 className="stack">More Info</h2>

      <div className="pt-5 pb-10">
      <ul>
        <li>
          <a href="https://www.space.com/13558-historic-mars-missions.html">A brief history of Mars missions</a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Exploration_of_Mars">Exploration of Mars</a>
        </li>
        <li>
          <a href="ihttps://history.nasa.gov/marschro.htm">A Chronology of Mars Exploration</a>
        </li>
      </ul>
      </div>
    </div>
  );
}
