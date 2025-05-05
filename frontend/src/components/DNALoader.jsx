import React from 'react';

const DNALoader = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      {/* DNA Animation */}
      <div className='dna-container'>
        <div className='dna'>
          {[...Array(10)].map((_, i) => (
            <div key={i} className='dna-strand'>
              <div
                className={`dna-nucleotide ${i % 2 === 0 ? 'left' : 'right'}`}
              ></div>
              <div className='dna-connector'></div>
              <div
                className={`dna-nucleotide ${i % 2 === 0 ? 'right' : 'left'}`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Health-related loading text */}
      <div className='mt-8 text-center'>
        <h3 className='text-lg font-medium text-emerald-600 mb-2'>
          Discovering Health Innovations
        </h3>
        <p className='text-sm text-gray-600 max-w-md'>
          Sequencing the genome of health startups revolutionizing healthcare
          across the globe...
        </p>
      </div>

      {/* CSS for DNA Animation */}
      <style jsx>{`
        .dna-container {
          height: 180px;
          width: 60px;
          perspective: 1000px;
          overflow: hidden;
        }

        .dna {
          position: relative;
          transform-style: preserve-3d;
          animation: rotate 4s linear infinite;
          height: 100%;
        }

        @keyframes rotate {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }

        .dna-strand {
          position: relative;
          height: 18px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dna-nucleotide {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #10b981; /* emerald-500 */
          opacity: 0.8;
        }

        .dna-nucleotide.left {
          animation: pulseLeft 2s ease-in-out infinite alternate;
        }

        .dna-nucleotide.right {
          animation: pulseRight 2s ease-in-out infinite alternate;
        }

        @keyframes pulseLeft {
          0%,
          100% {
            transform: translateX(0);
            background-color: #10b981; /* emerald-500 */
          }
          50% {
            transform: translateX(-8px);
            background-color: #0ea5e9; /* sky-500 */
          }
        }

        @keyframes pulseRight {
          0%,
          100% {
            transform: translateX(0);
            background-color: #10b981; /* emerald-500 */
          }
          50% {
            transform: translateX(8px);
            background-color: #0ea5e9; /* sky-500 */
          }
        }

        .dna-connector {
          height: 2px;
          width: 40px;
          background: linear-gradient(
            90deg,
            rgba(16, 185, 129, 0.2) 0%,
            rgba(14, 165, 233, 0.6) 50%,
            rgba(16, 185, 129, 0.2) 100%
          );
          transform: scaleX(0.9);
        }
      `}</style>
    </div>
  );
};

export default DNALoader;
