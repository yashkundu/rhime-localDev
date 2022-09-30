

const ListLayout = ({genres}) => {
    return (
        <div className="h-[47vh] overflow-auto flex flex-col items-center mb-[10px]">
            {genres.map(genre => (
                <div className="bg-white px-[4px] py-[2px] my-[4px] text-[#FF6CFA] text-[25px] font-semibold">
                    {genre}
                </div>
            ))}
        </div>
    )
}

export default ListLayout