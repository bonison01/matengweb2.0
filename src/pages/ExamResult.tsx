import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ExamResult = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16 bg-gray-50 py-12">
                <div className="container mx-auto px-6 text-center"><br /><br />
                    {/* <h1 className="text-4xl font-bold mb-8">Competition Answer Keys</h1> */}
                    {/* <p className="text-lg text-gray-600 mb-10">
                        Download the official answer key PDFs for each class below.
                    </p> */}

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">Exam Result</h2>
                        <a
                            href="https://drive.google.com/file/d/1yOMBAhNW7sDRjXPzK26o884xV_McQH-P/view?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary text-white font-medium px-5 py-3 rounded hover:bg-primary-dark transition"
                        >
                            Download PDF
                        </a>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default ExamResult;
