
export const searchKeywords = (title) =>{

  var result=[];
  var movieTitle=title.toUpperCase();

  const composer =[
    "BACH","MOZART","BEETHOVEN","WAGNER","HAYDN","BRAHMS",
    "SCHUBERT","SCHUMANN","HANDEL","TCHAIKOVSKY","MENDELSSOHN",
    "DVORAK","LISZT","CHOPIN","STRAVINSKY","VERDI","MAHLER",
    "PROKOFIEW","SHOSTAKOVICH","STRAUSS","BERLIOZ","DEBUSSY",
    "PUCCHINI","PALESTRINA","BRUCKNER",
    "TELEMANN","SAINT SAENS","SAINT-SAENS","SIBELIUS","RAVEL",
    "ROSSINI","GREIG","GLUCK","HINDEMITH","MONTEVERDI",
    "BARTOK","FRANCK","VIVALDI","BIZET","MUSSORGSKY",
    "RAMEAU","FAURE","RIMSKY","DONIZETTI","WILLIAMS","STRAUSS",
    "SMETANA","WEBER","JANACEK","COUPERIN","BORODIN"
  ];

  const instr =[
    "PIANO","HARP","HARPSICHORD","ORGAN",
    "VIOLIN","VIOLA","CELLO","DOUBLE BASS","CONTRA BASS",
    "FLUTE","PICCOLO","OBOE","HORN","CLARINET","BASSOON","SAXOPHONE",
    "TRUMPET","TROMBONE","TUBA",
    "TIMPANI","CYMBALS","XYLOPHONE","MARIMBA","VIBRAPHONE",
    "SOPRANO","ALTO","TENOR","BARITONE"
  ];

  const form=[
    "SONATA","SYMPHONY","CONCERTO","ETUDE","OVERTURE",
    "SONATINE","RONDO","RITORNELLO","FUGA","CANON","INVENTION",
    "OPERA","SUITE"
  ];

  const spec=[
    "NO.","OP.","K.","KV.","BWV.","HOB.","R.","L.","D.",
    "ANH.","B.","S."
  ];


  //작곡자 이름 추츨//
  for(var i=0;i<composer.length;i++){
    var composerIndex=movieTitle.indexOf(composer[i]);

    if(composerIndex!==-1){
      result.push(composer[i]);
    }
  }

  //악기이름 추츨 //
  for(var i=0;i<instr.length;i++){
    var instrIndex=movieTitle.indexOf(instr[i]);

    if(instrIndex!==-1){
      result.push(instr[i]);
    }
  }

  //곡 형식 추츨//
  for(var i=0;i<form.length;i++){
    var formIndex=movieTitle.indexOf(form[i]);

    if(formIndex!==-1){
      result.push(form[i]);
    }
  }

  //곡 번호 추출//
  for(var i=0;i<spec.length;i++){
    var specIndex=movieTitle.indexOf(spec[i]);

    if(specIndex!==-1){
      var specKind=spec[i];
      result.push(specKind);

      var rightText=movieTitle.slice(specIndex,movieTitle.length);
      var rightTextArr=rightText.split(" ");

      for(var j=0; j<rightTextArr.length;j++){
        if(!isNaN(rightTextArr[j]) ){
          result.push(rightTextArr[j]);
        }
      }
    }
  }

  if(result.length>=4){
    result=result.join(" ");
  }else{
    result=title;
  }

  return result;
};

