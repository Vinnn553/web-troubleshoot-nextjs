'use client'
import Image from "next/image";
import laptopImg from "../../public/img/Illustration.svg"
import { useEffect } from "react";
import { createTimeline, splitText, stagger } from 'animejs';

export default function HeroSection() {
    useEffect(() => {
        const target = document.getElementById('heroText');

        if (!target) return;

        const splitter = splitText(target, {
            words: { wrap: 'clip' },
            chars: true,
        });

        const tl = createTimeline({
            loop: true,
            defaults: { ease: 'inOut(3)', duration: 900, delay: 2000 }
        })
            .add(splitter.words, {
                y: [$el => +$el.dataset.line % 2 ? '100%' : '-100%', '0%'],
            }, stagger(400))
            .add(splitter.chars, {
                y: $el => +$el.dataset.line % 2 ? '100%' : '-100%',
            }, stagger(10, { from: 'random' }));
        // 3. Cleanup untuk React StrictMode agar tidak macet saat refresh/re-mount
        return () => {
            tl.revert();
            splitter.revert();
        };
    }, []);
        return (
            <div>
                {/* Hero Section */}
                <section className="hero grid section pt-20 mb-15 bg-[#ebeff3] w-full">
                    <div className="hero container-content flex flex-col md:flex-row items-center self-center justify-between py-10 mx-6 md:mx-36">
                        <div className="hero-data grid self-center gap-4">
                            <h1 id='heroText' className="headerText text-[40px] font-semibold leading-tight text-gray-600 w-[500px] min-[320px]:w-[300px] md:w-[500px]">
                                Tutorial Penanganan Masalah <span className="text-[#42a6f8]">Komputer & Jaringan</span>
                            </h1>
                            <h2 className="text-black pb-2 text-lg max-w-md">
                                Solusi terarah untuk mendiagnosis serta memperbaiki gangguan pada perangkat dan jaringan Anda.
                            </h2>
                            <div className="button">
                                <a href="#kategori" className="btn btnMulai inline-block bg-[#42a6f8] drop-shadow-[3px_5px_0_black] hover:bg-[#3d7191] transition-all px-8 py-2.5 text-xl font-medium text-white shadow-sm hover:shadow-md hover:scale-110">
                                    Mulai Belajar
                                </a>
                            </div>
                        </div>
                        <div className="header-image mt-8 md:mt-0">
                            <Image src={laptopImg} alt="Laptop" className="w-80 min-[320px]:hidden md:block w-96" />
                        </div>
                    </div>
                </section>
            </div>
        )
    }