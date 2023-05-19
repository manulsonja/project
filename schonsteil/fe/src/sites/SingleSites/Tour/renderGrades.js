


export const renderGrade = (grade) => { 
    const media = process.env.REACT_APP_API_URL + '/media/ressources/difficultyIcons/klettern/'

    switch(grade){

        case(0): {
            return(
              'Schwierigkeit ist 0'
            )
        }
        case(1): {
          return(
            'Schwierigkeit ist 0'
          )
      }  case(2): {
        return(
          'Schwierigkeit ist 0'
        )
    }  case(3): {
      return(
        'Schwierigkeit ist 0'
      )
  }  case(4): {
    return(
      'Schwierigkeit ist 0'
    )
}  case(5): {
  return(
    media+'climb3min.png'

  )
}  case(6): {
return(
    media+'climb3.png'
    )
}  case(7): {
return(
    media+'climb3pl.png'
)
}  case(8): {
return(
    media+'climb4min.png'
)
}  case(9): {
return(
   media+'climb4.png'
)
}  case(10): {
return(
    media+'climb4pl.png'
)
}  case(11): {
return(
  media+'climb5min.png'
  )
}  case(12): {
return(
'Schwierigkeit ist 0'
)
}  case(13): {
return(
'Schwierigkeit ist 0'
)
}
    }
  }


export const renderProtection = (pro) => {
  const media = process.env.REACT_APP_API_URL + '/media/ressources/difficultyIcons/absicherung/'

  switch(pro){
    
    case(1): {
      return(
        media+'gut.png'
      )
  }
  case(2): {
    return(
      media+'mittel.png'
    )
}  case(3): {
  return(
    media+'alpin.png'
  )
 
  }
}
}

export const renderAlpineDiff = (alpineDiff) => {
  const media = process.env.REACT_APP_API_URL + '/media/ressources/difficultyIcons/hochtour/'

  switch(alpineDiff){
    case(0): {
      return(
        media+"hochtourFmin.png"
      )
  }
    case(1): {
      return(
        media+"hochtourF.png"
      )
  }
  case(2): {
    return(
      media+"hochtourFpl.png"
      )
}  case(3): {
  return(
    media+"hochtourPDmin.png"
    )
}  case(4): {
return(
  media+"hochtourPD.png"
  )
}  case(5): {
return(
  media+"hochtourPDpl.png"
  )
}  
  }
}

export const renderFitness = (fitness) => {
  const media = process.env.REACT_APP_API_URL + '/media/ressources/difficultyIcons/fitness/'

  switch(fitness){
    case('l'): {
      return(
        media+"leicht.png"
      )
  }
    case('m'): {
      return(
        media+"mittel.png"
      )
  }
  case('s'): {
    return(
      media+"schwer.png"
      )
}  
  }
}
export const renderTechDiff = (tech) => {
  const media = process.env.REACT_APP_API_URL + '/media/ressources/difficultyIcons/wandern/'

  switch(tech){
    case('l'): {
      return(
        media+"wandernleicht.png"
      )
  }
    case('m'): {
      return(
        media+"wandernmittel.png"
      )
  }
  case('s'): {
    return(
      media+"wandernschwer.png"
      )
}  
  }
}
