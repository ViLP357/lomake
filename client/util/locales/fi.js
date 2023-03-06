export default {
  // default namespace, can be used without prefix, ie. t('logOut')
  common: {
    logOut: 'Kirjaudu ulos',
    backToFrontPage: 'Takaisin etusivulle',
    chosenLanguage: 'Suomi',
    form: 'Lomake',
    positive: 'Kunnossa',
    neutral: 'Haasteet tiedossa ja niiden kehittäminen työn alla',
    negative: 'Vaatii merkittäviä toimenpiteitä / kehittämiskohteita ei ole tarkennettu',
    noColors: '*Kysymyksiä, joille ei ole määritetty hymiöitä, ei näytetä ollenkaan (esim. 16 ja 17)',
    green: 'Vihreä',
    yellow: 'Keltainen',
    red: 'Punainen',
    EMPTY: 'Ei vastausta',
    empty: 'Ei vastausta',
    OK: 'Vastattu',
    lastSaved: 'Viimeksi tallennettu',

    faculty: ' Tiedekunta',
    programmeHeader: 'Koulutusohjelma',
    code: 'Koodi',
    allProgrammes: 'Kaikki ohjelmat',
    bachelor: 'Kandiohjelmat',
    master: 'Maisteriohjelmat',
    doctoral: 'Tohtoriohjelmat',
    international: 'Kansainväliset maisteriohjelmat',
    programmeFilter: 'Etsi koulutusohjelmia',

    noData: 'Yhtään ohjelmia tai vastauksia ei löytynyt. Kokeile muuttaa hakua.',
    selectAll: 'Valitse kaikki',
    clearSelection: 'Tyhjennä valinta',
    responses: 'Vastauksia:',
    writtenAnswers: 'Kirjalliset vastaukset',
    smileyColors: 'Hymiöiden värit',

    choose: 'Valitse',
    colors_all: 'kaikki',
    colors_green: 'vain vihreät',
    colors_yellow: 'vain keltaiset',
    colors_red: 'vain punaiset',
    answers: 'vastaukset',

    email: 'Sähköpostiosoite',
    cancel: 'Peruuta',
    edit: 'Muokkaa',
    delete: 'Poista',

    yearlyAssessment: 'Vuosiseuranta',
    katselmus: 'Katselmus',
    koulutusuudistus: 'Koulutusuudistus',
  },

  // other namespaces, use requires prefix, eg. t('aboutPage:title')

  aboutPage: {
    title: 'Tietoa lomakkeesta',
    whatIsIt: 'Mikä tilannekuvalomake on?',
    whatIsItReply:
      'Tilannekuvalomake on koulutusohjelman johtoryhmässä käytävän tilannekuvakeskustelun asialista ja keskustelun dokumentoinnin väline. Lomaketta käytetään Helsingin yliopistossa.',
    howToFillTitle: 'Miten tilannekuvalomake täytetään?',
    howToFill: ` 
    Tilannekuvalomakkeen aiheisiin liittyvät kysymykset on tarkoitettu keskustelua virittäviksi, eikä niihin sellaisenaan ole tarkoitus vastata. 
    Lomakkeelle kirjataan lyhyesti muistiin keskustelun pääkohdat. Lisäksi laaditaan toimenpidelista ohjelmalle itselleen ja erillinen toimenpidelista tiedekunnan suunnitelmia varten.
    Kustakin aihealueesta annetaan yleisarvio (liikennevalot). ”Missä mennään?” -liikennevaloarvio on tarkoitettu keskustelun herättämistä varten, eikä sen perusteella tehdä johtopäätöksiä toiminnan laadusta.`,
    whatElseTitle: 'Mitä muuta lomakkeella voi tehdä?',
    whatElse:
      'Voit lukea oman ja muiden koulutusohjelmien tilannekuvien kirjallisia dokumentaatioita.  Raportointityökaluilla voit vertailla oman koulutusohjelmasi tietoja muiden tietoihin. Voit myös muodostaa tiedoista kuvaajia.',
    contactInfo: 'Kysyttävää? Ota yhteys osoitteeseen ospa@helsinki.fi',
    broughtBy: 'Touteutus:',
  },

  comparison: {
    compare: 'Vastausten vertailu',
    reportHeader: {
      byFaculty: 'Vertaile ohjelmaa tiedekuntaan',
      byYear: 'Vertaile vastauksia vuosittain',
    },
    selectYears: 'Valitse vuodet, joita haluat tarkastella',
    filterFaculties: 'Vastaukset tiedekunnittain',
    selectQuestions: 'Vertailun kysymykset',
    writtenAnswers: 'Kirjalliset vastaukset vuosittain',
    chosenProgrammes: 'Valittu ohjelma',
    chooseProgramme: 'Valitse vertailtava ohjelma',
    compareFaculties: 'Vertaile tiedekunnittain',
    emptyAnswers: 'Ota mukaan koulutusohjelmat, jotka eivät ole vastanneet kysymykseen',
    university: 'Koko yliopisto',
    noAccessToAll: 'Huomioithan, että verrokkina näkyy vain niiden ohjelmien tiedot, joihin sinulla on lukuoikeus',
    labelOptions: 'Graafin yksikkö',
    percentage: 'Prosenttiosuudet',
    programmeAmount: 'Ohjelmien lukumäärä',
    programmes: 'Ohjelmaa',
    fullscreen: 'Koko näyttö',
    downloadPNG: 'Lataa PNG-kuvana',
    downloadSVG: 'Lataa SVG-kuvana',
    downloadPDF: 'Lataa PDF-tiedostona',
    chartExport: 'Tilannekuvalomakkeen_vuosivertailu',
  },

  formView: {
    title: 'KOULUTUSOHJELMAN TILANNEKUVAN DOKUMENTOINTI',
    info1:
      'Käykää koulutusohjelman johtoryhmässä keskustelua seuraavista aiheista. Aiheisiin liittyvät kysymykset on tarkoitettu keskustelua virittäviksi, eikä niihin sellaisenaan ole tarkoitus vastata.',
    info2: 'Antakaa yleisarvio ”Missä mennään?” -kunkin aiheen kohdalla (liikennevalot):',
    downloadCSV: 'Lataa vastaukset csv-tiedostona',
    downloadPDF: 'Tulosta vastaukset PDF-tiedostona',
    mandatory: 'pakollinen kenttä',
    saveFailed: 'Virhe: Viimeisen 10 sekunnin aikana tekemäsi muutokset eivät tallentuneet onnistuneesti!',
    saveFailedInstructions:
      'Jatkaaksesi lomakkeen täyttämistä, ole hyvä ja ota viimeiset muutoksesi talteen. Klikkaa sen jälkeen allaolevaa näppäintä ladataksesi sivu uudelleen.',
    reload: 'Lataa sivu uudelleen',
    status: {
      locked: 'Lomake on valitulta vuodelta lukittu, eikä sitä voi muokata.',
      open: 'vastaukset ovat avoinna muokattavaksi.',
      canBeOpened: 'Lomakkeen omistaja voi vielä avata lomakkeen ennen sen eräpäivää',
      deadlinePassed: 'Lomakeen täyttöaika on päättynyt.',
      ospaProcessing: 'OSPA käsittelee vastaukset.',
    },
    savingAnswers: 'Vastaukset tallentuvat automaattisesti. Viimeinen vastauspäivä:',
    noSystemsSelected: 'Ei valittuja palautejärjestelmiä.',
    selectSystems: 'Valitkaa järjestelmä klikkaamalla',
    mostUseful: 'Hyödyllisimmät palautejärjestelmät',
  },

  generic: {
    companionFilter: 'Ota vastauksiin mukaan tiedekunnan yhteistyöohjelmat',
    isWriting: 'kirjoittaa',
    allDoctoralSchools: 'Kaikki tohtoriohjelmat',
    doctoralSchoolFilter: 'Tohtoriohjelmien vastaukset tutkijakouluittain',
    socialSchool: 'Humanistis-yhteiskuntatieteellinen tutkijakoulu',
    sciencesSchool: 'Luonnontieteellinen tutkijakoulu',
    healthSchool: 'Terveyden tutkimuksen tutkijakoulu',
    environmentalSchool: 'Ympäristö-, elintarvike- ja biotieteellinen tutkijakoulu',
    textAreaLabel: 'Keskustelun pääkohdat olivat',
    allFaculties: 'Kaikki tiedekunnat',
    collapseText: 'Piilota viime vuoden vastaukset',
    expandText: 'Näytä viime vuoden vastaukset',
    compareLevel: 'Vertaile koulutusasteittain',
    levelFilter: 'Vastaukset koulutusasteittain',
    measureLabel: 'Lisätkää 1-5 toimenpidettä',
    noPermissions:
      'Sinulla ei ole oikeuksia millekään koulutusohjelmalle. Ota yhteyttä opetuksen strategisiin palveluihin tai koulutusohjelman johtajaan.',
    nowShowing: 'VASTAUKSISSA MUKANA OLEVAT OHJELMAT:',
    chooseMore: 'VALITSE OHJELMAT RAPORTILLE:',
    tooLongPaste:
      'Teksti jota yrität liittää (yhteensä {{newLength}} merkkiä) ei mahdu maksimimerkkimäärään ({{MAX_LENGTH}} merkkiä)',
    year: 'Valitse vuodet',
    pdfExportText: 'Tilannekuvalomakkeen_vastaukset',
    reportPage: 'Tilannekuvalomakkeen vastaukset',
    downloadPDF: 'Lataa vastaukset PDF-tiedostona',
    statusHeader: 'Vuoden {{year}} vastaukset ovat avoinna muokattaviksi.',
    statusMessage: 'Voit vaihtaa vuoden otsikon alla näkyvästä valikosta. Viimeinen vastauspäivä: ',

    csvFileformwritten: 'Tilannekuvalomake_kirjalliset_vastaukset',
    csvFileformcolors: 'Tilannekuvalomake_hymiöiden_värit',
    csvFileoverviewwritten: 'Tilannekuvalomake_kaikki_ohjelmat_kirjalliset_vastaukset',
    csvFileoverviewcolors: 'Tilannekuvalomake_kaikki_ohjelmat_hymiöiden_värit',
    colors: 'Hymiöiden värit',
    written: 'Kirjalliset vastaukset',
  },

  overview: {
    betterThanLastYear: 'Parempi kuin viime vuonna',
    worseThanLastYear: 'Huonompi kuin viime vuonna',
    formLocked: 'Lomake on lukittu',
    formUnlocked: 'Lomaketta voi muokata',
    unlockForm: 'Poista lukitus',
    lockForm: 'Lukitse lomake',
    overviewPage: 'Lomake - Yleisnäkymä',
    accessRights: 'Käyttöoikeudet',
    selectYear: 'Valitse tarkasteltava vuosi',
    readAnswers: 'Lue vastauksia',
    compareAnswers: 'Vertaile vastauksia',
    csvDownload: 'Lataa CSV',
    name: 'Nimi',
    view: 'Luku',
    edit: 'Vastaus',
    owner: 'Omistaja',
    noUsers: 'Ei käyttäjiä',
    userListJory: 'Lomakkeelle kirjautuneet käyttäjät, jotka kuuluvat koulutusohjelman johtoryhmään',
    userListOthers: 'Lomakkeelle kirjautuneet muut käyttäjät, joilla oikeus koulutusohjelmaan',
  },

  report: {
    pdfNotification: 'Vain tähän valitut kysymykset ja vastaukset tulevat PDF-tulosteelle',
    facultyFilter: 'Vastaukset tiedekunnittain',
    reportPage: 'Tilannekuvalomakkeen vastaukset',
    selectQuestions: 'Suodata kysymyksiä',
    clickToCheck: 'Katso kirjalliset vastaukset',
    question: 'Kysymys',
    answered: 'Vastattu',
  },

  users: {
    nextDeadline: 'Lomakkeen viimeinen täyttöpäivä: ',
    answersSavedForYear: 'Vastaukset tallennetaan vuodelle: ',
    contactToska: 'Jos viimeiseen aukiolopäivään tulee muutoksia, otathan yhteyden Toskaan (grp-toska@helsinki.fi).',
    noDeadlineSet: 'Viimeistä aukiolopäivää ei tälle vuodelle ole vielä asetettu tai se on jo umpeutunut. ',
    selectNewDeadline: 'Valitse viimeinen aukiolopäivä',
    selectDraftYear: 'Valitse muokkausvuosi: ',
    deadlineWarning:
      'Lomake on jo auki toiselle vuodelle, lukitse lomake ennen uuden vuoden avaamista, jotta tiedot tallentuvat oikein',
    updateDeadline: 'Päivitä viimeinen aukiolopäivä',
    deleteThisDeadline: 'Lukitse lomake',
    noDraftYear: 'Ei valittua vastausvuotta',
    adminPage: 'Lomake - Ylläpito-sivu',
    users: 'Käyttäjät',
    iams: 'IAM-ryhmät',
    deadline: 'Lomakkeen aukioloaika',
    updateStudyprogrammes: 'Koulutusohjelmien päivittäminen',
    deadlineSettings: 'Lomakkeen aukiolon määritys',
    moreProgrammes_one: 'muu ohjelma',
    moreProgrammes_other: 'muuta ohjelmaa',
    special: {
      access_accessAllProgrammes: 'Kaikki ohjelmat',
      access_accessInternational2020: 'Kansainväliset maisteriohjelmat 2020 ->',
      access_accessInternational: 'Kansainväliset maisteriohjelmat',
      access_accessDoctoral: 'Kaikki tohtoriohjelmat',
    },
    basicUser: 'Peruskäyttäjä',
    superAdmin: 'Super-admin',
    searchByName: 'Etsi käyttäjiä nimellä',
    filterByAccess: 'Etsi koulutusohjelmien perusteella',
    name: 'Nimi',
    userId: 'Käyttäjätunnus',
    access: 'Oikeudet',
    userGroup: 'Käyttäjäryhmä',
    lastLogin: 'Kirjautunut viimeksi',
    specialGroup: 'Käyttöoikeusryhmät',
    role: 'Ensisijainen rooli',

    tempAccess: 'Oikeuksien hallinta',
    tempAccessMangement: 'Väliaikaisten oikeuksien hallinta',
    tempAccessInfo1:
      'Käyttäjälle voidaan tarvittaessa myöntää väliaikainen luku- tai kirjoitusoikeus tiettyyn koulutusohjelmaan.',
    tempAccessInfo2:
      'Oikeuden saajan tulee olla jo AIEMMIN KIRJAUTUNUT lomakkeelle. Oikeuden myöntämisestä lähetetään sähköposti-ilmoitus kyseisen koulutusohjelman johtajalle.',
    tempAccessNote:
      'Tämä toiminto on tarkoitettu vain poikkeustilanteisiin. Oikeuksien jaossa tulisi ensisijaisesti käyttää IAM-ryhmiä.',
    receiverEmail: 'Oikeuden saajan helsinki.fi-sähköpostiosoite',
    accessProgramme: 'Koulutusohjelma, johon oikeudet annetaan',
    endOfAccess: 'Käyttöoikeuden viimeinen voimassaolopäivä',
    kojoEmail: 'Koulutusohjelman johtajan sähköpostiosoite',
    giveWritingRights: 'Anna kirjoitusoikeudet',
    saveRight: 'Tallenna oikeus',
    tempAccesses: 'Annetut väliaikaiset oikeudet',
    expired: 'Näytä vanhentuneet',
    writingRight: 'Kirjoitusoikeus',
    endsIn: 'Päättyy',
    confirm: 'Poista käyttäjän {{firstname}} {{lastname}} väliaikainen oikeus ohjelmaan {{progName}}?',
  },
}
