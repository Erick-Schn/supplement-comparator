import './index.scss'
import { useState, useEffect } from 'react'
import { Dumbbell, Target, TrendingUp } from 'lucide-react';


export function Header() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header>
            <div className={'container ' + isScrolled ? 'scrolled' : ''}>
                <div className='header-brand'>    
                    <Dumbbell className={`text-white transition-all duration-300 ${
                        isScrolled ? 'h-6 w-6' : 'h-8 w-8'
                    }`} />
                    <div>
                        <p><b>FittSupp Analytics</b></p>
                        <p>Análise Completa de Suplementos</p>
                    </div>
                </div>
                <div className={'header-components'}>
                    <div>
                        <Target className={`text-blue-600 transition-all duration-300 ${
                            isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                        }`} />
                        <p>Hipertrofia</p>
                    </div>
                    <div>
                        <TrendingUp className={`text-green-600 transition-all duration-300 ${
                            isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                        }`} />
                        <p>Performance</p>
                    </div>
                </div>
            </div>
        </header>
    )
}