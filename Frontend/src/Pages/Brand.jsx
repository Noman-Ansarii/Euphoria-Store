import React from 'react'

import Brand1 from '../media/Brand/1.png';
import Brand2 from '../media/Brand/2.png';
import Brand3 from '../media/Brand/3.png';
import Brand4 from '../media/Brand/4.png';
import Brand5 from '../media/Brand/5.png';

function Brand() {
    return (
        <>
            <div className="brand container rounded-2xl mt-36 py-10">
                <div className="brand_heading">
                    <h1 className='text-4xl font-bold py-1'>Top Brands Deal</h1>
                    <p className='py-9'>Up To <span className="yellow">60%</span> off on brands</p>
                </div>
                <div className="row row-span-5 gap-4 justify-center">
                    <div className="box"><img src={Brand1} alt="" /></div>
                    <div className="box"><img src={Brand2} alt="" /></div>
                    <div className="box"><img src={Brand3} alt="" /></div>
                    <div className="box"><img src={Brand4} alt="" /></div>
                    <div className="box"><img src={Brand5} alt="" /></div>
                </div>
            </div>
        </>
    )
}

export default Brand
