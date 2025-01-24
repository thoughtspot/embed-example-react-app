export default function AdminHome() {
    return (
        <main className="flex min-h-fit flex-col items-center justify-between p-24">
            <div id="welcome">
                <h1>Application Administration </h1>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <ul>
                <li>Group Content Assignment</li>
                <li>User-Group Assignment</li>
                <li><a href="admin/data-entitlements/">User Data Entitlements Assignment</a></li>    
                </ul>
            </div>
        </main>
    );
}
