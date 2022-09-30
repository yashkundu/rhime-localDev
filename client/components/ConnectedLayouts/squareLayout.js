

const SquareLayout = ({items, isTrack}) => {
    return (
        <div className="h-[47vh] overflow-auto grid sm:grid-cols-3 grid-cols-2 gap-[10px] px-[25px] mb-[10px]">
            {items.map(item => (
                <div className="flex flex-col items-center">
                    <img src={item.imageUrl} alt="" className="h-[60px] w-[60px] rounded-[15px]" />
                    {isTrack? (
                        <div className="overlay-hidden flex flex-col items-center">
                            <div className="font-semibold">{item.trackName}</div>
                            <div>{item.artistName}</div>
                        </div>
                    ): (
                        <div className="overlay-hidden text-[12px]">
                            <div>{item.artistName}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default SquareLayout