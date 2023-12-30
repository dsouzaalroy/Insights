
// function Genres({ week, month, year }: { week: ArtistTop, month: ArtistTop, year: ArtistTop }) {

import Authenticator from "./Authenticator";

function LoginPage() {

    return(
        <div className="">
            <div className="h-screen flex items-center ml-5 lg:ml-20">
                <div className="grid grid-row-3 gap-2 mb-7 lg:mb-15">
                    <div className="text-3xl font-custom lg:text-5xl">Insights</div>
                    <div className="text-sm-3 lg:text-sm mb-5 ">Enhance your music experience by logging in with Spotify to view personalised insights into your unique listening habits.</div>
                    <Authenticator/>
                </div>
            </div>
            {/* <div>
            </div> */}
        </div>
    );
}

export default LoginPage;
