const RecommendationCard = ({text}) => {
  return (
    <>
      <div className="flex justify-center border-2 border-neutral-700 text-neutral-300 rounded-2xl p-3 w-[150px] h-[100px]">{text}</div>
    </>
  )
}

export default RecommendationCard;