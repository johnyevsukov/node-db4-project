const db = require('../data/db-config')
async function getRecipeById(recipe_id) {
    const data = await db('recipes as rp')
        .select('rp.*', 'st.step_id', 'st.step_number', 'st.step_instructions', 'ing.*', 'si.ingredient_quantity')
        .join('steps as st', 'rp.recipe_id', 'st.recipe_id')
        .join('steps_ingredients as si', 'st.step_id', 'si.step_id')
        .join('ingredients as ing', 'si.ingredient_id', 'ing.ingredient_id')
        .where('rp.recipe_id', recipe_id)

    // data.filter(a => {
    //     a.step_id == currentStep
    // }).map(x => {
    //     return {
    //         ingredient_name: x.ingredient_name,
    //         ingredient_quantity: x.ingredient_quantity
    //     }
    // })

    // data.map(a => {
    //     if(a.step_id == currentStep){
    //         return {
    //           ingredient_name: a.ingredient_name,
    //           ingredient_quantity: a.ingredient_quantity
    //           }
    //     }
    //     else {
    //         console.log('hello')
    //     }

    const used = []
    const steps = data.map(x => {
        const currentStep = x.step_id
        if(!used.includes(x.step_id)){
            return {
              step_id: x.step_id,
              step_number: x.step_number,
              step_instructions: x.step_instructions,
              ingredients: data.map(a => {
                  if(a.step_id == currentStep){
                      return {
                        ingredient_name: a.ingredient_name,
                        ingredient_quantity: a.ingredient_quantity
                        }
                  }
                  used.push(x.step_id)
              })
            }
        }
      })

      const transformedData = {
        recipe_id: data[0].recipe_id,
        recipe_name: data[0].recipe_name,
        created_at: data[0].created_at,
        steps: steps[0].step_id == null ? [] : steps
      }

      return transformedData
}
module.exports = {
    getRecipeById
}