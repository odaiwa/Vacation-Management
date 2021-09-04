import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <div className="HomeDescription">
                <h3>
                    <b>About me :</b>
                </h3>
                <p>
                    <h4>Odai Wattad</h4>a 22 years old software Engineer from Jatt,
                    about to finish my B.Sc. in SCE.<br />
                    Currently learning full-stack development in John Bryce
                </p>
            </div>
            <div className="HomeDescription">
                <h3>
                    <b> About the website:</b>
                </h3>
                <p>
                    The website manager vacations you can follow vacations look for pricing and dates.<br /> <br />
                    ⁕ <b>Home Page</b> where you're currently reading.<br />
                    ⁕ <b>Vacations</b> where you can see every think about the vacations.<br />
                </p>
            </div>
            <div className="HomeDescription">
                <h3><b>Technologies used to develope the website: </b></h3>
                <dl>
                    <dt>Front end</dt>
                    <dd>- React</dd>
                    <dt>Back end</dt>
                    <dd>- NodeJs</dd>
                    <dt>Database</dt>
                    <dd>- MySQL</dd>
                </dl>
                <p>for state management we used <b>Redux</b></p>
                <p>for Authentication we used <b>JWT</b></p>
                <p>for notifications we used <b>Notyf</b> Library</p>
            </div>
            <div className="HomeDescription">
                <h3><b> Contact me:</b></h3>
                <p>
                    Email: odaiwa12@gmail.com, or visit my own website <a href="https://www.odaiwa.com">Here</a>(Currently nothing in there 😆)
                </p>
                <div className="noBlock">
                    <p><a href="https://www.linkedin.com/in/odaiwa">LinkedIn</a></p>
                </div>
                <span> | </span>
                <div className="noBlock">
                    <p><a href="https://www.github.com/odaiwa">GitHub</a></p>
                </div>
            </div>

        </div>
    );
}

export default Home;
