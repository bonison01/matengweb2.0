import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AnswerKeyPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16 bg-gray-50 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold mb-8">Competition Answer Keys</h1>
                    <p className="text-lg text-gray-600 mb-10">
                        Download the official answer key PDFs for each class below.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {/* Class 4 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4 text-primary">Class 4</h2>
                            <a
                                href="/lovable-uploads/ans-Class-4.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-primary text-white font-medium px-5 py-3 rounded hover:bg-primary-dark transition"
                            >
                                Download PDF
                            </a>
                        </div>

                        {/* Class 5 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4 text-primary">Class 5</h2>
                            <a
                                href="/lovable-uploads/ans-Class-5.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-primary text-white font-medium px-5 py-3 rounded hover:bg-primary-dark transition"
                            >
                                Download PDF
                            </a>
                        </div>

                        {/* Class 6 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4 text-primary">Class 6</h2>
                            <a
                                href="/lovable-uploads/ans-Class-6.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-primary text-white font-medium px-5 py-3 rounded hover:bg-primary-dark transition"
                            >
                                Download PDF
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AnswerKeyPage;
