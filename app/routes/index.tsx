export default function Index() {
  return (
    <div>
      <div className="stack">
          <h1 className="title">MartianRover.com</h1>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mars_2020_JPL_second_insignia.svg" width="20%" />
          <h3 className="subtitle">
              Perseverance successfully landed at 18 February 2021 at 21:01 UTC on the surface of Mars.
          </h3>
          <a href="https://en.wikipedia.org/wiki/Jezero_(crater)" style={{ maxWidth: '80%' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/260184-JezeroCrater-Delta-Full.jpg/898px-260184-JezeroCrater-Delta-Full.jpg" />
          </a>
      </div>

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
