
// function Genres({ week, month, year }: { week: ArtistTop, month: ArtistTop, year: ArtistTop }) {

import Authenticator from "./Authenticator";

function LoginPage() {

    return(
        <div className="">
            <div className="grid gap-5 grid-cols-1 grid-rows-3 ml-20">
                <div>insights</div>
                <div>Please login with Spotify to view insights into you listening habits</div>
                <Authenticator/>
            </div>
            {/* <div>
            </div> */}
        </div>
    );
}

export default LoginPage;
