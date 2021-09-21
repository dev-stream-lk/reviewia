import { Grid, Link, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../components/Controls";
import { Form } from "../components/useForm";
import { Typography } from "@material-ui/core";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import MainImage from "../static/img/login_img.svg";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5),
    },
  },

  siteName: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(2),
    },
  },
  paperDiv: {
    padding: `${theme.spacing(0)}px ${theme.spacing(0)}px ${theme.spacing(
      2
    )}px ${theme.spacing(0)}px !important`,
  },
  disabledSubmit: {
    backgroundColor: `${theme.palette.grey[300]} !important`,
    width: 250,
    minHeight: 50,
  },
  activeSubmit: {
    backgroundColor: "#236CC7 !important",
    width: 250,
    minHeight: 50,
  },
  loginImage: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inherit",
    },
  },
  title: {
    color: `${theme.palette.primary.main} !important`,
  },
}));

const ButtonSet = () => {
  // const [selected, setSelected] = useState(0);

  return (
    <Form>
      <Grid>
        <Grid
          style={{
            // maxHeight: "100vh",
            height: "5vh",
            display: "flex",
            alignItems: "left",
            flexWrap: "wrap",
            paddingLeft: "30px",
          }}
        >
          <PlaylistAddCheckIcon />
          <Typography>Terms</Typography>
        </Grid>
        <Grid
          container
          style={{
            boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.21)",
            padding: "10px",
            borderRadius: "10px",
            overflow: "auto",
          }}
        >
          <Terms />
        </Grid>
      </Grid>
      {/* <Grid container alignItems="center">
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          style={{ marginTop: 20 }}
        >
          <Controls.Button
            text="Decline"
            style={{
              width: "20%",
              height: "100%",
              ...(selected === 0
                ? { color: "white", backgroundColor: "#236CC7" }
                : { color: "#236CC7", backgroundColor: "white" }),
            }}
            // style={{
            //   backgroundColor: "#236CC7",
            // }}
          />
          <Controls.Button
            text="Accept"
            style={{
              width: "20%",
              height: "100%",
              ...(selected === 1
                ? { color: "white", backgroundColor: "#236CC7" }
                : { color: "#236CC7", backgroundColor: "white" }),
            }}
            // style={{
            //   backgroundColor: "#236CC7",
            // }}
          />
        </Grid>
      </Grid> */}
    </Form>
  );
};

const Terms = () => {
  return (
    <Grid
      item
      xs={12}
      style={{
        // maxHeight: "100vh",
        padding: "30px",
        height: "50vh",
        paddingTop: "10px",
      }}
      container
      spacing={3}
    >
      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Welcome to the Reviewia website.
        </Typography>
        These terms, conditions, and notices (“Terms”) govern your access to and use of the Reviewia website, including access and use through any other website or platforms or mobile applications, (“Site”).
        By accessing or using this Site in any manner, you agree to be bound by these Terms. Please read these Terms carefully. If you do not accept all of these Terms, you may not use this Site.
        Be sure to return to this page periodically to review the most current version of these Terms. We may modify these Terms or any additional terms that apply to this Site to, for example, reflect changes to the law or changes to this Site. We will notify you about material changes to these Terms by either sending a notice to the email address you provided to us and/or by placing a prominent notice of modifications to these Terms on this page. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted. However, changes addressing new functions or features of this Site or changes made for legal reasons will be effective immediately. If you do not agree to the modified Terms, you should discontinue your use of this Site.
        The terms “we”, “us”, “our” and “Reviewia” refer to Reviewia, Inc., a (). The term “you” refers to the person visiting this Site and/or contributing content on this Site. If you are accessing or using this Site on behalf of a business, that business accepts these Terms, and the term “you” also refers to that business.
      </Typography>

      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Use of the Site
        </Typography>
        This Site allows you to search for and share information about technology products, services, and vendors, communicate with others, and/or create new content such as recommendations and reviews. You also can connect with those who post about products and services. To make sure that reviews are unbiased, current and real, we have developed Community Guidelines and use different mechanisms to verify that you are who you say you are. However, you decide what information you want to share with the public since you have the option to post your reviews, or not post any review at all.
        As a condition of your use of this Site, you warrant that (i) all information supplied by you on this Site is true, accurate, current, and complete, (ii) if you have a Reviewia account (“Registered User”), you will safeguard your account information and will supervise and be completely responsible for any use of your account by anyone other than you, and (iii) you are 18 years of age or older. Reviewia does not knowingly collect the information of anyone under the age of 18. We retain the right at our sole discretion to deny access to anyone to this Site and the content we offer, at any time and for any reason, including, but not limited to, for violation of these Terms.
        Please be advised that all reviews, including any endorsements, of third-party products, services, or vendors contained on this Site are the opinions of the reviewers of those products, services, or vendors and not those of Reviewia.
      </Typography>

      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Prohibited Activities
        </Typography>
        The content and information on this Site (including, but not limited to, messages, data, information, text, photos, graphics,, icons, software, code, or other material), as well as the infrastructure used to provide such content and information, is proprietary to us, except as expressly provided in these Terms. You agree not to otherwise modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell or re-sell any such content or information obtained from or through this Site. Therefore, if there are more than two activities reported as not following Community Guidelines and Standards, conducted by a registered user, his/ her account will be banned from the system. The particular user will not be able to use the account to access services offered by Reviewia.
        Additionally, you agree not to:
        use this Site or its contents for any commercial purpose without our express written permission;
        access, monitor, or copy any content or information of this Site using any robot, spider, scraper, or other automated means or any manual process for any purpose without our express written permission;
        violate the restrictions in any robot exclusion headers on this Site or bypass or circumvent other measures employed to prevent or limit access to this Site;
        take any action that imposes, or may impose, in our discretion, an unreasonable or disproportionately large load on our infrastructure;
        deep-link to any portion of this Site for any purpose without our express written permission;
        “frame”, “mirror”, or otherwise incorporate any part of this Site into any other website or mobile application without our prior written authorization;
        attempt to modify, translate, adapt, edit, decompile, disassemble, or reverse engineer any software programs used by Reviewia in connection with this Site or the content we provide;
        post reviews on products or services offered by your current employer or by direct competitors of your current employer; or
        log in using an alias that masks your true identity.
      </Typography>

      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Privacy Policy
        </Typography>
        Reviewia believes in protecting your privacy. Review our current Privacy Policy which also governs your use of this Site, to understand our practices.
      </Typography>

      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Reviews, Comments, and Use of Other Interactive Areas
        </Typography>
        We appreciate hearing from you. To that end, this Site contains various forums through which you and third parties may post reviews of experiences using technologies and services or post or link other content, messages, materials, or other items to this Site (“Interactive Areas”). If Reviewia provides you access to such Interactive Areas (as a Registered User or otherwise), you are solely responsible for your use of such Interactive Areas and use them at your own risk. By using any Interactive Areas, you expressly agree not to post, link, upload to, transmit, distribute, store, create, or otherwise publish through this Site any of the following:
        Any message, data, information, text, music, sound, photos, graphics, screenshots, video, code, or any other material (“Content”) that is unlawful, libelous, defamatory, obscene, pornographic, indecent, lewd, suggestive, harassing, threatening, invasive of privacy or publicity rights, abusive, inflammatory, fraudulent, or otherwise objectionable;
        Content that would constitute, encourage, or provide instructions for a criminal offense, violate the rights of any party, or otherwise create liability or violate any local, state, national, or international law, including, without limitation, the regulations;
        Content that may infringe or misappropriate any patent, trademark, trade secret, copyright, or other intellectual or proprietary right of any party;
        Content that impersonates any person or entity or otherwise misrepresents your affiliation with a person or entity, including Reviewia;
        Unsolicited promotions, political campaigning, advertising, contests, raffles, or solicitations;
        Private information of any third party, including, without limitation, surname (family name), addresses, phone numbers, email addresses;
        Viruses, corrupted data, or other harmful, disruptive, or destructive files;
        Content that is unrelated to the topic of the Interactive Area(s) in which such Content is posted, linked, or otherwise published; or
        Content or links to content that, in the sole judgment of Reviewia, (i) violates the previous subsections herein, (ii) is objectionable, (iii) restricts or inhibits any other person from using or enjoying the Interactive Areas or this Site, or (iv) may expose Reviewia or its affiliates or its or their users and/or sublicensees to any harm or liability of any type.
        Any use of the Interactive Areas or other portions of this Site in violation of the foregoing violates these Terms and may result in, among other things, termination or suspension of your rights to use the Interactive Areas and/or this Site.
        Without limiting the foregoing, Reviewia takes no responsibility and assumes no liability for any content posted, stored, or uploaded by you or any third party, or for any loss or damage thereto, nor is Reviewia liable for any mistakes, defamation, slander, libel, omissions, falsehoods, obscenity, pornography, or profanity you may encounter. As a provider of interactive services, Reviewia is not liable for any statements, representations, or content provided by its users in any public forum or other Interactive Area. Although Reviewia has no obligation to screen, edit, or monitor any of the Content posted to or distributed through any Interactive Area, Reviewia reserves the right, and has absolute discretion, to remove, screen, or edit, without notice, any Content posted or stored on this Site at any time and for any reason, and you are solely responsible for creating backup copies of and replacing any Content you post or store on this Site at your sole cost and expense.
      </Typography>

      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          License and Consent to Use Submissions
        </Typography>
        Please be aware that by submitting Content to this Site by postings or links on this Site, electronic mail, or otherwise, including any product or service reviews (whether written or video), questions, comments, suggestions, ideas, or the like contained in any submissions, (individually and collectively, “Submissions”), you grant Reviewia and its affiliates a nonexclusive, royalty-free, perpetual (except as expressly provided in our Privacy Policy, transferable, irrevocable (except as expressly provided in our Privacy Policy), and fully sublicensable right to (a) use, reproduce, modify, adapt, translate, distribute, publish, create derivative works from, and publicly display and perform such Submissions throughout the world in any media, now known or hereafter devised; and (b) use the name and other personal information, including your likeness, that you submit in connection with each such Submission. You acknowledge that Reviewia will only provide direct attribution of your Submissions with your permission or in order to cooperate with legitimate governmental requests, subpoenas, or court orders. You acknowledge and agree that no Submissions will include confidential or proprietary information of a third party or information that you otherwise are not allowed to disclose to the public. You acknowledge and agree that your Submissions, your name, and, if you include a photo in your profile or submit a video review, your likeness, and any other personal characteristics or private information you include with your Submissions, may be used by us, our affiliates, and our sublicensees through other websites (including advertising on such sites as described below), social media sites (including advertising on such sites as described below), platforms, mobile apps, and/or other marketing materials, such as slide decks or case studies, all as further described in our Privacy Policy.
        With respect to reviews included in your Submissions (whether written or video), you will be asked at the time of your Submission whether you consent to the use of that review, and the name, likeness, and other personal characteristics and private information you include with your Submission, for advertising, promotion, and other commercial and business purposes. Your consent, if you indicate “yes”, means that:
        you irrevocably permit, authorize, grant, and license the provider of the reviewed product or service and its affiliates, successors, and assigns, and/or G2 Crowd and its affiliates, successors, and assigns, and each of their respective licensees, advertising agencies, promotion agencies, and fulfillment agencies, and the employees, officers, directors, and agents of each and all of them (“Authorized Persons”), the rights to publicly display, publicly perform, exhibit, transmit, broadcast, reproduce, record, photograph, digitize, adapt, create derivative works, exploit, sell, rent, license, otherwise use, and permit others to use your name, image, likeness/appearance, voice, professional biographical information, and review Content, each and all solely to the extent and as reflected in the review Content that you voluntarily submit to this Site (it being understood that the foregoing does not permit the Authorized Persons to materially modify or otherwise materially alter the meaning or context of the review or any information that you submit with the review and that is posted on this Site), and all materials created by or on behalf of the Authorized Persons that incorporate any of the foregoing (“Materials”), in perpetuity, throughout the world in any medium or format whatsoever, now existing or hereafter created, in and on social media platforms, including those made available on the internet and/or mobile applications, and as part of infographics and/or storyboards, without further consent from or royalty, payment, or other compensation to you;
        to the fullest extent permitted by applicable law, you irrevocably waive all legal and equitable rights relating to all liabilities, claims, demands, actions, suits, damages, and expenses, including but not limited to claims for copyright or trademark infringement, infringement of moral rights, libel, defamation, invasion of any rights of privacy (including intrusion, false light, public disclosure of private facts, and misappropriation of name or likeness), violation of rights of publicity, physical or emotional injury or distress, or any similar claim or cause of action in tort, contract, or any other legal theory, now known or hereafter known in any jurisdiction throughout the world (collectively, “Claims”) arising directly or indirectly from the Authorized Persons’ exercise of their rights under the immediately preceding paragraph or the production, exhibition, exploitation, advertising, promotion, or other use of the Materials, and whether resulting in whole or in part by the negligence of Authorized Persons, covenant not to make or bring any such Claim against any Authorized Persons, and forever release and discharge the Authorized Persons from liability under such Claims; and
        you represent and warrant to each of the Authorized Persons, that you are at least eighteen (18) years of age, and that you have full right, power, and authority to grant the rights hereunder and further represent and warrant to each of the Authorized Persons that you will provide only true and correct statements and other information in connection with the Authorized Persons’ use of the Materials and the rights and license granted hereunder do not, and will not, violate any right (including without limitation copyright, trademark, trade secret, right to privacy, or right of publicity) of, or conflict with or violate any contract with or commitment made to, any person or entity, and that no consent or authorization from, or any payment to, any third party is required in connection herewith.
        If it is determined that you retain moral rights (including rights of attribution or integrity) in the Submissions or Content, you hereby declare that (a) you do not require that any personally identifying information be used in connection with the Submission or Content, or any derivative works of or upgrades or updates thereto; (b) you have no objection to the publication, use, modification, deletion, and exploitation of the Submission and/or Content by Reviewia or its licensees, successors, and assigns; (c) you forever waive and agree not to claim or assert any entitlement to any and all moral rights of an author in any of the Submissions or Content; and (d) you forever release Reviewia, and its licensees, successors, and assigns, from any claims that you could otherwise assert against Reviewia by virtue of any such moral rights.
      </Typography>

      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Liability Disclaimer
        </Typography>
        THE INFORMATION, CONTENT, SUBMISSIONS, SOFTWARE, PRODUCTS, AND/OR SERVICES PUBLISHED ON OR THROUGH THIS SITE MAY INCLUDE INACCURACIES OR ERRORS.REVIEWIA DOES NOT GUARANTEE THE ACCURACY OF, AND DISCLAIMS, ALL LIABILITY FOR ANY ERRORS OR OTHER INACCURACIES RELATING TO, THE INFORMATION AND DESCRIPTION OF THE TECHNOLOGY PRODUCTS AND RELATED SERVICES DISPLAYED ON THIS SITE (INCLUDING, WITHOUT LIMITATION, THE PRICING, SCREENSHOTS, VIDEOS, LIST OF PRODUCT AND SERVICE FEATURES, VENDOR COMPANY INFORMATION, GENERAL PRODUCT DESCRIPTIONS, ETC.).REVIEWIA  MAKES NO REPRESENTATIONS ABOUT THE SUITABILITY OF THE INFORMATION, CONTENT, SUBMISSIONS, SOFTWARE, PRODUCTS, AND/OR SERVICES CONTAINED OR DESCRIBED ON THIS SITE FOR ANY PURPOSE, AND THE INCLUSION OR OFFERING OF ANY PRODUCTS OR SERVICES ON OR THROUGH THIS SITE DOES NOT CONSTITUTE ANY ENDORSEMENT OR RECOMMENDATION OF SUCH PRODUCTS OR SERVICES BY REVIEWIA.ALL SUCH INFORMATION, CONTENT, SUBMISSIONS, SOFTWARE, PRODUCTS, AND/OR SERVICES ARE PROVIDED “AS IS” WITHOUT WARRANTY OF ANY KIND BY REVIEWIA.REVIEWIA  DISCLAIMS ALL WARRANTIES AND CONDITIONS THAT THIS SITE, ITS SERVERS, OR ANY EMAIL SENT FROM REVIEWIA, ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.REVIEWIA  HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH REGARD TO THE INFORMATION, CONTENT, SUBMISSIONS, SOFTWARE, PRODUCTS, AND/OR SERVICES CONTAINED OR DESCRIBED ON THIS SITE, INCLUDING ALL IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON INFRINGEMENT.
        IN NO EVENT SHALL REVIEWIA  (NOR ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES) BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF, OR IN ANY WAY CONNECTED WITH, YOUR ACCESS TO, DISPLAY ON, OR USE OF THIS SITE OR WITH THE DELAY OR INABILITY TO ACCESS, DISPLAY, OR USE THIS SITE (INCLUDING, BUT NOT LIMITED TO, YOUR RELIANCE UPON OPINIONS APPEARING ON THIS SITE; ANY COMPUTER VIRUSES, INFORMATION, CONTENT, SUBMISSIONS, SOFTWARE, LINKED SITES, PRODUCTS, AND/OR SERVICES OBTAINED OR ACCESSED THROUGH THIS SITE; OR OTHERWISE ARISING OUT OF THE ACCESS TO, DISPLAY ON, OR USE OF THIS SITE) WHETHER BASED ON A THEORY OF NEGLIGENCE, CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE, AND EVEN IF REVIEWIA  HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        The limitation of liability reflects the allocation of risk between the parties.The limitations specified in this section will survive and apply even if any limited remedy specified in these Terms is found to have failed of its essential purpose.The limitations of liability provided in these Terms inure to the benefit of Reviewia.
      </Typography>

      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Copyright and Trademark Notices
        </Typography>
        All contents of this Site are: © Copyright 2021 Reviewia, Inc. All Rights Reserved. Reviewia is not responsible for content on websites, platforms, or mobile applications operated by parties other than Reviewia. Reviewia, its logo, and, except as noted below, all other product or service names, logos, or slogans displayed on this Site are registered and/or common law trademarks of Reviewia, Inc. or its suppliers or licensors and may not be copied, imitated, or used, in whole or in part, without the prior written permission of Reviewia or the applicable trademark holder. In addition, the look and feel of this Site, including all page headers, custom graphics, button icons, and scripts, is the service mark, trademark, and/or trade dress of Reviewia and may not be copied, imitated, or used, in whole or in part, without the prior written permission of Reviewia. All other trademarks, registered trademarks, product names, and company names or logos mentioned in or on this Site are the property of their respective owners. Reference to any products, services, processes, or other information, by trade name, trademark, manufacturer, supplier, or otherwise does not constitute or imply endorsement, sponsorship, or recommendation thereof by Reviewia.
        Other logos and product and company names mentioned herein may be the trademarks of their respective owners.
      </Typography>

      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          General
        </Typography>
        You agree that all claims you may have against Reviewia, Inc. arising from or relating to this Site must be heard and resolved in a court of competent subject matter jurisdiction. Use of this Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this paragraph.
        You agree that no joint venture, agency, partnership, or employment relationship exists between you and Reviewia and/or affiliates as a result of these Terms or use of this Site.
        Our performance under these Terms is subject to existing laws and legal process, and nothing contained in these Terms limits our right to comply with law enforcement or other governmental or legal requests or requirements relating to your use of this Site or information provided to, or gathered by, us with respect to such use. To the extent allowed by applicable law, you agree that you will bring any claim or cause of action arising from or relating to your access or use of this Site within two (2) years from the date on which such claim or action arose or accrued or such claim or cause of action will be irrevocably waived.
        If any part of these Terms is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remaining provisions in these Terms shall continue in effect.
        These Terms (and any other terms, policies, guidelines, or agreements referenced herein) constitute the entire agreement between you and Reviewia with respect to this Site and supersede all prior or contemporaneous communications and proposals, whether electronic, oral, or written, between you and Reviewia with respect to this Site. A printed version of these Terms and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to these Terms to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.
        Fictitious names of companies, products, people, characters, and/or data mentioned on this Site are not intended to represent any real individual, company, product, or event. Any rights not expressly granted herein are reserved.
      </Typography>

      <Typography
        align="justify"
        style={{
          marginTop: "10px",
          fontWeight: 400,
          fontSize: 15,
          marginBottom: 8,
        }}
      >
        <Typography
          align="left"
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Service Help
        </Typography>
        For answers to your questions or ways to contact us, email us at info@reviewia.com.
        © Copyright 2021 Reviewia, Inc. All Rights Reserved
      </Typography>
      
    </Grid>
  );
};

export default function TermsOfService() {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={false} className={classes.loginImage} md={5}>
        <Grid
          container
          justifyContent="center"
          style={{ flexDirection: "column", paddingLeft: 40 }}
        >
          <Link
            underline="none"
            variant="h3"
            align="center"
            component={RouterLink}
            to="/"
            className={classes.title}
          >
            Reviewia
          </Link>
          <img alt="" style={{ width: "100%" }} src={MainImage} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={11} md={7} className={classes.wrapper}>
        <Grid item className={classes.siteName}>
          <Link
            underline="none"
            variant="h3"
            align="center"
            component={RouterLink}
            to="/"
            className={classes.title}
          >
            Reviewia
          </Link>
        </Grid>
        <Controls.Paper
          className={classes.paper}
          divClassName={classes.paperDiv}
        >
          <Grid container alignItems="center">
            <Grid
              item
              xs={12}
              style={{
                backgroundColor: "#236CC7",
                boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.21)",
                minHeight: 50,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                style={{
                  marginTop: "10px",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                Reviewia Terms of Service
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h7"
                align="left"
                style={{
                  marginTop: "20px",
                  marginLeft: 40,
                  marginRight: 40,
                  fontWeight: 600,
                }}
                component="div"
              >
                Terms of Service
              </Typography>
              <Typography
                variant="h7"
                align="left"
                style={{
                  marginLeft: 40,
                  marginRight: 40,
                  fontWeight: 200,
                }}
                component="div"
              >
                Last updated on August 29, 2021
              </Typography>
            </Grid>
          </Grid>
          <ButtonSet />
        </Controls.Paper>
      </Grid>
    </Grid>
  );
}
