const SuffixLookup = { //rlhf todo
    'tion':['sion','cion','ion','cean','on','an','tions','ions','ons'],
    'sion':['tion','cion','ion','cean','on','an','sions','ions','ons'],
    'cion':['tion','sion','ion','cean','on','an','cions','ions','ons'],
    'cean':['tion','sion','cion','ion','cean','on','an','tions','ions','ons'],
}

export default function SuffixMap(tgt){ //Suffix Synonym Mapping
    return SuffixLookup[tgt];
} 

function train(newRhyme, oldRoot){

    SuffixLookup.push({ oldRoot : newRhyme })

}