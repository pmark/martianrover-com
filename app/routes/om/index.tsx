export default function Index() {
    return (
        <div>
            <div className="stack">
                <h1 className="title">OMGlobe</h1>
            </div>

            <fieldset>
                <legend>To Do</legend>
                <ul>
                    <li>Design</li>
                    <ul>
                        <li>Route based CSS</li>
                        <li>ThreeJS globe</li>
                        <li>Display user locations</li>
                        <li>Display om event locations</li>
                        <li>Display visitor and om stats</li>
                        <li>Countdown to next global om event (hourly)</li>
                    </ul>
                    <li>API</li>
                    <ul>
                        <li>GET updates</li>
                        <li>POST om event</li>
                    </ul>
                </ul>
            </fieldset>
        </div>
    );
}
