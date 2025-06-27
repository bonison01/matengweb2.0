import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ExamResult = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16 bg-gray-50 py-12">
                <div className="container mx-auto px-6 text-center"><br /><br />
                    {/* <h1 className="text-4xl font-bold mb-8">Competition Answer Keys</h1> */}


                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">Exam Result</h2>
                        <a
                            href="https://drive.google.com/file/d/1yOMBAhNW7sDRjXPzK26o884xV_McQH-P/view?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary text-white font-medium px-5 py-3 rounded hover:bg-primary-dark transition"
                        >
                            Download PDF
                        </a><br /><br />
                        <h1 className="container mx-auto px-6 text-center">
                            The Prize Distribution Ceremony will be held on 29th June 2025 at 2:00 PM at Manipur University, Canchipur.<br /><br />
                            All winners are requested to attend the ceremony to receive their prizes.<br /><br />
                            The winners will be awarded prizes in the form of cash and certificates.<br /><br />
                            The winners will also be given a chance to meet the Chief Guest and other dignitaries.<br /><br />

                            We kindly request all students to attend the ceremony along with their parents to receive their prizes.
                        </h1>
                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
};

export default ExamResult;
