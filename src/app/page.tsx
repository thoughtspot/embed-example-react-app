export default function Home() {
    return (
        <main className="flex min-h-fit flex-col items-center justify-between p-24">
            <div id="welcome">
                <h1>Welcome to the ThoughtSpot Embedding Example</h1>
                <p>
                    This application demonstrates some of the basic embedding techniques possible using React and the
                    ThoughSpot SDK.
                </p>
                <p>&nbsp;</p>

                <h1>Page descriptions</h1>

                <ul className="instructions list-disc list-inside">
                    <li>
                        Dashboard - View the list of dashboards (or just your own) and select a dashboard for viewing.
                    </li>
                    <li>
                        Data Chat - Pick a data source and ask your own questions of our AI analyst assistant.
                    </li>
                </ul>
            </div>
        </main>
    );
}
