async function getYear() {
    'use cache'
    return new Date().getFullYear();
}

export default async function Footer() {
    return (
        
            <footer className="footer flex justify-center bg-[#8dccff] p-5  ">
                <h1>&copy; Dekoruma.com <span id="year">{await getYear()}</span></h1>
            </footer>
        
    )
}