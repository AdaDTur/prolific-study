// set up experiment logic for each slide
function make_slides(f) {
  var slides = {};

  // set up initial slide
  slides.i0 = slide({
    name: "i0",
    start: function() {
      exp.startT = Date.now();
    },
    log_responses: function() {
      exp.consent.push({"consent": "I consent to take part in the study. I agree to the anonymous use of the data in research presentations, publications, and online interactive sites to illustrate the findings. I agree that the collected data could be used in related follow-up studies. I agree to the use of the data in a not-for-profit anonymous corpus for research purposes which others will have access to."})
    },
    button: function() {
      this.log_responses()
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
    })
  

  // set up the first example slide
  slides.example1 = slide({
    name: "example1",

    // this is executed when the slide is shown
    start: function() {
      // hide error message
      $('.badrating_err').hide();
      $('.norating_err').hide();
    },

    // this is executed when the participant clicks the "Continue button"
    button: function() {
      // read in the value of the selected radio button
      this.radio = $("input[name='number']:checked").val();
      // check whether the participant selected a reasonable value (i.e, 1, 2, or 3)
      if (this.radio){
        if (this.radio == "1" || this.radio == "2" || this.radio == "3") {
          // log response
          this.log_responses();
          // continue to next slide
          exp.go();
        } else {
          // participant gave non-reasonable response --> show error message
          $('.norating_err').hide();
          $('.badrating_err').show();
        }
      } else {
        $('.badrating_err').hide();
        $('.norating_err').show();
      
      }
    },

    log_responses: function() {
      // add response to exp.data_trials
      // this data will be submitted at the end of the experiment
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase,
        "id": "example1",
        "response": this.radio,
        
      });
    },
  });

  // set up slide for second example trial
  slides.example2 = slide({
    name: "example2",

    start: function() {
      // hide error message
      $('.badrating_err').hide();
      $('.norating_err').hide();
      $("input[name='number']:checked").prop("checked", false);
    },

    // handle button click
    button: function() {
      // read in the value of the selected radio button
      this.radio = $("input[name='number']:checked").val();
      // check whether the participant selected a reasonable value (i.e, 5, 6, or 7)
      if (this.radio){
        if (this.radio == "5" || this.radio == "6" || this.radio == "7") {
          // log response
          this.log_responses();
          // continue to next slide
          exp.go();
        } else {
          // participant gave non-reasonable response --> show error message
          $('.norating_err').hide();
          $('.badrating_err').show();
        }
      } else {
        $('.badrating_err').hide();
        $('.norating_err').show();
      
      }
    },

    log_responses: function() {
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase,
        "id": "example2",
        "response": this.radio,
        
      });
    }
  });

  // set up slide with instructions for main experiment
  slides.startExp = slide({
    name: "startExp",
    start: function() {
    },
    button: function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.trial1 = slide({
    name: "trial1",

    // start: function() {
    //  var stim = {
     //   "TGrep": "37224:9",
      //  "Context": "Speaker A:  and, and i, you know, i still provide most of the things that  go on around the house.<p>Speaker B: right.<p>Speaker A: so, uh, yeah and for a while i was going to school too, and tha-, it was tough.<p>Speaker B: yeah,  i uh, i think that while it 's a good change for i think women to be able  to fulfill their potential in whatever they feel, you know, their expertise may be .<p>Speaker A: uh-huh.<p>Speaker B: uh-huh.<p>Speaker A: uh, i think sometimes other things suffer and tha-, i think it 's hard to find a balance there.<p>Speaker B: ",
      //  "EntireSentence": "but in some ways i think we are expected  to do it all.",
      //  "ButNotAllSentence": "but in <strong>some, but not all</strong> ways i think we are expected  to do it all."
      //}    
    // The 7 lines above from "start:..." to the end of var stim = {...}" define a placeholder stimulus that you will have to delete when
    // loading in the individual stimulus data. 

    // To rotate through stimulus list, comment out the above 7 lines and  uncomment the following 2:
    present: exp.stimuli1,
    present_handle : function(stim) {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("#check-strange").prop("checked", false);
      $("#trial_comments").val("");
      // store stimulus data
      this.stim = stim;

      // extract original and sentence with "but not all"
      var sentence_a = stim.sentence_a;
      var sentence_b = stim.sentence_b;

      //handle display of context 
      // if (exp.condition == "context") {
      //   // extract context data
      //   var contexthtml = stim.Context;
      //   // reformat the speaker information for context
      //   contexthtml = contexthtml.replace(/Speaker A:/g, "<b>Speaker #1:</b>");
      //   contexthtml = contexthtml.replace(/Speaker B:/g, "<b>Speaker #2:</b>");
      //   $(".case").html(contexthtml);
      // } else {
      //   var contexthtml = "";
      //   $(".case").html(contexthtml);
      // }

      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#trial-SentenceA1").html(sentence_a);
      $("#trial-SentenceB1").html(sentence_b);
      $(".err").hide();
      $('.comment_err').hide();

    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        $('.err').hide()
        this.log_responses();
        _stream.apply(this);
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "id": this.stim.id,
        "sentence_a": this.stim.sentence_a, 
        "sentence_b": this.stim.sentence_b,
        "shift_a": this.stim.shift_a,
        "shift_b": this.stim.shift_b,
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "response": this.radio,
        "comments": this.comments,
      });
    },
  });

  slides.attention1 = slide({
    name: "attention1",

    start: function() {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("#trial_comments").val("");
      $(".err").hide();
      $('.comment_err').hide();

    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        if (this.radio == "1" | this.radio == "2" | this.radio == "3") {
          this.attention = 1
        }
        else {
          this.attention = 0
        }

        $('.err').hide()
        this.log_responses();
        exp.go();
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "id": "attention",
        "attention": this.attention,
        "comments": this.comments,
      });
    },
  });


  // BATCH 2:

  slides.trial2 = slide({
    name: "trial2",

    present: exp.stimuli2,
    present_handle : function(stim) {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("#check-strange").prop("checked", false);
      $("#trial_comments").val("");
      // store stimulus data
      this.stim = stim;

      // extract original and sentence with "but not all"
      var sentence_a = stim.sentence_a;
      var sentence_b = stim.sentence_b;

      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#trial-SentenceA2").html(sentence_a);
      $("#trial-SentenceB2").html(sentence_b);
      $(".err").hide();
      $('.comment_err').hide();

    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        $('.err').hide()
        this.log_responses();
        _stream.apply(this);
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "id": this.stim.id,
        "sentence_a": this.stim.sentence_a, 
        "sentence_b": this.stim.sentence_b,
        "shift_a": this.stim.shift_a,
        "shift_b": this.stim.shift_b,
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "response": this.radio,
        "comments": this.comments,
      });
    },
  });

  slides.attention2 = slide({
    name: "attention2",

    start: function() {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("#trial_comments").val("");
      $(".err").hide();
      $('.comment_err').hide();

    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        if (this.radio == "5" | this.radio == "6" | this.radio == "7") {
          this.attention = 1
        }
        else {
          this.attention = 0
        }

        $('.err').hide()
        this.log_responses();
        exp.go();
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "id": "attention",
        "attention": this.attention,
        "comments": this.comments,
      });
    },
  });

// BATCH 3:

  slides.trial3 = slide({
    name: "trial3",

    present: exp.stimuli3,
    present_handle : function(stim) {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("#check-strange").prop("checked", false);
      $("#trial_comments").val("");
      // store stimulus data
      this.stim = stim;

      // extract original and sentence with "but not all"
      var sentence_a = stim.sentence_a;
      var sentence_b = stim.sentence_b;

      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#trial-SentenceA3").html(sentence_a);
      $("#trial-SentenceB3").html(sentence_b);
      $(".err").hide();
      $('.comment_err').hide();

    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        $('.err').hide()
        this.log_responses();
        _stream.apply(this);
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "id": this.stim.id,
        "sentence_a": this.stim.sentence_a, 
        "sentence_b": this.stim.sentence_b,
        "shift_a": this.stim.shift_a,
        "shift_b": this.stim.shift_b,
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "response": this.radio,
        "comments": this.comments,
      });
    },
  });

  slides.attention3 = slide({
    name: "attention3",

    start: function() {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("#trial_comments").val("");
      $(".err").hide();
      $('.comment_err').hide();
    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        if (this.radio == "1" | this.radio == "2" | this.radio == "3") {
          this.attention = 1
        }
        else {
          this.attention = 0
        }

        $('.err').hide()
        this.log_responses();
        exp.go();
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "id": "attention",
        "attention": this.attention,
        "comments": this.comments,
      });
    },
  });

// BATCH 4:

  slides.trial4 = slide({
    name: "trial4",

    present: exp.stimuli4,
    present_handle : function(stim) {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("#check-strange").prop("checked", false);
      $("#trial_comments").val("");
      // store stimulus data
      this.stim = stim;

      // extract original and sentence with "but not all"
      var sentence_a = stim.sentence_a;
      var sentence_b = stim.sentence_b;

      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#trial-SentenceA4").html(sentence_a);
      $("#trial-SentenceB4").html(sentence_b);
      $(".err").hide();
      $('.comment_err').hide();

    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        $('.err').hide()
        this.log_responses();
        _stream.apply(this);
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "id": this.stim.id,
        "sentence_a": this.stim.sentence_a, 
        "sentence_b": this.stim.sentence_b,
        "shift_a": this.stim.shift_a,
        "shift_b": this.stim.shift_b,
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "response": this.radio,
        "comments": this.comments,
      });
    },
  });

  slides.attention4 = slide({
    name: "attention4",

    start: function() {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("#trial_comments").val("");
      $(".err").hide();
      $('.comment_err').hide();

    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        if (this.radio == "5" | this.radio == "6" | this.radio == "7") {
          this.attention = 1
        }
        else {
          this.attention = 0
        }

        $('.err').hide()
        this.log_responses();
        exp.go();
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "id": "attention",
        "attention": this.attention,
        "comments": this.comments,
      });
    },
  });

// BATCH 5:

  slides.trial5 = slide({
    name: "trial5",

    present: exp.stimuli5,
    present_handle : function(stim) {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("#check-strange").prop("checked", false);
      $("#trial_comments").val("");
      // store stimulus data
      this.stim = stim;

      // extract original and sentence with "but not all"
      var sentence_a = stim.sentence_a;
      var sentence_b = stim.sentence_b;

      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#trial-SentenceA5").html(sentence_a);
      $("#trial-SentenceB5").html(sentence_b);
      $(".err").hide();
      $('.comment_err').hide();

    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        $('.err').hide()
        this.log_responses();
        _stream.apply(this);
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "id": this.stim.id,
        "sentence_a": this.stim.sentence_a, 
        "sentence_b": this.stim.sentence_b,
        "shift_a": this.stim.shift_a,
        "shift_b": this.stim.shift_b,
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "response": this.radio,
        "comments": this.comments,
      });
    },
  });

  slides.attention5 = slide({
    name: "attention5",

    start: function() {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
        $("#trial_comments").val("");
        $(".err").hide();
        $('.comment_err').hide();

    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.comments = $("#trial_comments").val();
      if (this.radio) {
        if (this.radio == "1" | this.radio == "2" | this.radio == "3") {
          this.attention = 1
        }
        else {
          this.attention = 0
        }

        $('.err').hide()
        this.log_responses();
        exp.go();
        }        
      else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "id": "attention",
        "attention": this.attention,
        "comments": this.comments,
      });
    },
  });

  // slide to collect subject information
  slides.subj_info = slide({
    name: "subj_info",
    submit: function(e) {
      exp.subj_data = {
        language: $("#language").val(),
        enjoyment: $("#enjoyment").val(),
        asses: $('input[name="assess"]:checked').val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        education: $("#education").val(),
        fairprice: $("#fairprice").val(),
        comments: $("#comments").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  // 
  slides.thanks = slide({
    name: "thanks",
    start: function() {
      exp.data = {
        "consent": exp.consent,
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "condition": exp.condition,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      proliferate.submit(exp.data);
    }
  });

  return slides;
}


/// initialize experiment
function init() {

  exp.trials = [];
  exp.catch_trials = [];
  exp.consent = [];
  var stimuli = all_stims;
  
  // exp.stimuli = _.shuffle(stimuli[parseInt(get_url_param("list", 0))]);
  var t_fifth = exp.stimuli.length/25;
  exp.stimuli1 = exp.stimuli.slice(0,t_fifth);
  exp.stimuli2 = exp.stimuli.slice(t_fifth,2*t_fifth);
  exp.stimuli3 = exp.stimuli.slice(2*t_fifth,3*t_fifth);
  exp.stimuli4 = exp.stimuli.slice(3*t_fifth, 4*t_fifth);
  exp.stimuli5 = exp.stimuli.slice(4*t_fifth, 5*t_fifth);
  exp.stimuli1 = exp.stimuli.slice(5*t_fifth,6*t_fifth);
  exp.stimuli2 = exp.stimuli.slice(6*t_fifth,7*t_fifth);
  exp.stimuli3 = exp.stimuli.slice(7*t_fifth,8*t_fifth);
  exp.stimuli4 = exp.stimuli.slice(8*t_fifth, 9*t_fifth);
  exp.stimuli5 = exp.stimuli.slice(9*t_fifth,10*t_fifth);  
  exp.stimuli1 = exp.stimuli.slice(10*t_fifth,11*t_fifth);
  exp.stimuli2 = exp.stimuli.slice(11*fifth,12*t_fifth);
  exp.stimuli3 = exp.stimuli.slice(12*t_fifth,13*t_fifth);
  exp.stimuli4 = exp.stimuli.slice(13*t_fifth, 14*t_fifth);
  exp.stimuli5 = exp.stimuli.slice(14*t_fifth,15*t_fifth);  
  exp.stimuli1 = exp.stimuli.slice(15*t_fifth,16*t_fifth);
  exp.stimuli2 = exp.stimuli.slice(16*fifth,17*t_fifth);
  exp.stimuli3 = exp.stimuli.slice(17*t_fifth,18*t_fifth);
  exp.stimuli4 = exp.stimuli.slice(18*t_fifth, 19*t_fifth);
  exp.stimuli5 = exp.stimuli.slice(19*t_fifth,20*t_fifth);  
  exp.stimuli1 = exp.stimuli.slice(20*t_fifth,21*t_fifth);
  exp.stimuli2 = exp.stimuli.slice(21*fifth,22*t_fifth);
  exp.stimuli3 = exp.stimuli.slice(22*t_fifth,23*t_fifth);
  exp.stimuli4 = exp.stimuli.slice(23*t_fifth, 24*t_fifth);
  exp.stimuli5 = exp.stimuli.slice(24*t_fifth);  

  exp.n_trials = exp.stimuli.length;
  
  // exp.condition = _.sample(["context", "no-context"]); //can randomize between subjects conditions here
  
  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };

  //blocks of the experiment:
  exp.structure = [
    "i0",
    "example1",
    "example2",
    "startExp",
    "trial1",
    "attention1",
    "trial2",
    "attention2",
    "trial3",
    "attention3",
    "trial4",
    "attention4",
    "trial5",
    "attention5",
    "subj_info",
    "thanks"
  ];

  exp.data_trials = [];

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length();
  //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  $("#start_button").click(function() {
    exp.go();
  });

  exp.go(); //show first slide
}
