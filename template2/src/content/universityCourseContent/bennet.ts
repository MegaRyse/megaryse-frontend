import type { UniversityCourseContent } from '../../types/universityCourseContent'

/**
 * Bennett University (slug: bennet-university) — programme copy only.
 * Note: The supplied “BCOM” heading described the online BBA programme; it is mapped to `bba`.
 */
export const bennetUniversityCourseContent: Record<string, UniversityCourseContent> = {
  bba: {
    heroTitle: 'Bachelor of Business Administration (BBA)',
    mode: 'Online',
    duration: '3 Years',
    overview:
      'Bennett University offers a three-year Online Bachelor of Business Administration (BBA) programme designed to build a strong business foundation with real-world exposure for future corporate professionals. Anchored in the academic excellence of Bennett University and powered by the Times Group legacy, the programme combines conceptual depth with industry relevance in a flexible online format. Structured across six semesters, it develops learners’ understanding of key business functions such as marketing, finance, operations, human resources, and strategy, while strengthening analytical thinking, decision-making, and professional capabilities. Delivered through a technology-enabled learning experience with live sessions and application-oriented learning, the programme prepares students to become career-ready professionals in a digital-first economy.',
    highlights: [
      '100% online with live sessions for flexible learning',
      'UGC-entitled degree equivalent to on-campus programmes',
      '3-year programme structured across 6 semesters',
      'Strong foundation in core business functions',
      'Application-oriented, real-world learning approach',
      'Future-focused curriculum aligned with industry needs',
      'Case-based learning with practical exposure',
      'Projects and capstone for hands-on experience',
      'Focus on analytical, communication, and leadership skills',
      'Multiple specialisations across key business domains',
      'Designed for diverse learners including students and professionals',
      'Dedicated academic and learner support',
    ],
    eligibility: [
      'Candidates who have completed 10+2 education or graduate level education outside India must produce a certificate of equivalence issued by the Association of Indian Universities.',
    ],
    fees: {
      applicationFee: 'INR 11,500',
      totalFee: 'INR 150,000',
      paymentModes: 'No-cost EMI available',
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
  mba: {
    heroTitle: 'Master of Business Administration (MBA)',
    mode: 'Online',
    duration: '2 Years',
    overview:
      'Bennett University offers a two-year Online Master of Business Administration (MBA) programme designed to empower professionals to advance into leadership roles without stepping away from their careers. Crafted by academic experts and shaped by industry insight, the programme combines a rigorous academic framework with future-ready learning aligned to global business standards and emerging industry priorities. It builds a strong foundation across core management disciplines such as strategy, finance, marketing, operations, and people management, while enhancing strategic thinking, analytical capability, and decision-making. Structured across four semesters, the programme integrates application-led pedagogy through case studies, business simulations, and real-world problem-solving. Delivered through a flexible, technology-enabled learning experience with live interactive sessions and on-demand access, the programme prepares learners to lead confidently in a dynamic, digital-first business environment.',
    highlights: [
      '100% online learning with live sessions and on-demand access',
      'UGC-entitled MBA from a NAAC A+ accredited university',
      '2-year programme structured across 4 semesters',
      'Strong foundation across strategy, finance, marketing, operations, and HR',
      'Future-ready curriculum aligned with global and industry needs',
      'Case-based, application-led learning with real-world problem-solving',
      'Focus on strategic thinking, analytical skills, and decision-making',
      'Industry-aligned curriculum with practical business exposure',
      'Research and industry projects for hands-on experience',
      'Flexible learning designed for working professionals',
      'Specialisations in Business Analytics, Media Management, Sales & Marketing, Finance, Human Resource Management, and Logistics & Supply Chain Management',
    ],
    specializations: [
      'Business Analytics',
      'Media Management',
      'Sales & Marketing',
      'Finance',
      'Human Resource Management',
      'Logistics & Supply Chain Management',
    ],
    eligibility: [
      'Domestic students: Applicants must have passed Graduation in any discipline from a UGC-recognised university with a minimum of 50% aggregate marks and English as medium of instruction.',
      'International students: The eligibility criterion for all programmes for international applicants is minimum 50% in the qualifying examination and having studied the pre-requisite subjects for admission into the desired programme.',
    ],
    fees: {
      applicationFee: 'INR 11,500',
      totalFee: 'INR 210,000',
      paymentModes: 'No-cost EMI available',
    },
    scholarships: [
      'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.',
    ],
  },
}
