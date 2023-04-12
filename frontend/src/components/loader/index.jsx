import { Dna } from 'react-loader-spinner';

export function Loading({h,w}) {
    return (
        <div className="loading">
            <Dna
                visible={true}
                height={h}
                width={w}
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            /> 
        </div>
    )
}