const categories = ['Breakfast', 'Brunch', 'Lunch', 'Dinner']

const checkStringOfCategory = async (category) => {
    if (categories.includes(category)) {
        return true
    }
    return false
} 

module.exports = {
    checkStringOfCategory
}